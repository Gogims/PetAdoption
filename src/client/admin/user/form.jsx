import React from 'react';
import { Form, Button, Icon, Header, Segment } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import RoleList from './roleList';
import GraphQLBuilder from '../graphqlBuilder';
import helper from '../../../helper';

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        const user = props.user;
        const roles = user.roles.map(role => role.roles);

        //TODO: Use object spread
        this.state = {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            password: user.password,
            email: user.email,
            zipcode: user.zipcode,
            roles: roles
        };

        this.handleRole = this.handleRole.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    handleRole(roleChanged) {
        let updatedRoles;

        if (roleChanged.selected) {
            const newRole = Object.assign({}, {
                id: roleChanged.id,
                role: roleChanged.role
            });
            
            updatedRoles = this.state.roles.concat([newRole])
        }
        else {
            updatedRoles = this.state.roles.filter(role => role.id !== roleChanged.id);
        }

        this.setState({
            roles: updatedRoles
        });
    }

    handleInputChange(key, e, input) {
        this.setState({
            [key]: input.value
        });
    }

    saveUser() {
        console.log(this.state);
    }

    render() {
        const colorButton = this.props.isEdit ? "blue" : "green";
        const iconButton = this.props.isEdit ? "edit" : "add";

        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input label='First Name'
                        placeholder='First Name'
                        value={this.state.firstName}
                        onChange={this.handleInputChange.bind(this, "firstName")}
                    />
                    <Form.Input
                        label='Last Name'
                        placeholder='Last Name'
                        value={this.state.lastName}
                        onChange={this.handleInputChange.bind(this, "lastName")}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid
                        label='User Name'
                        placeholder='User Name'
                        value={this.state.userName}
                        onChange={this.handleInputChange.bind(this, "userName")}
                    />
                    <Form.Input fluid
                        label='Password'
                        placeholder='Password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleInputChange.bind(this, "password")}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid
                        label='Email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleInputChange.bind(this, "email")}
                    />
                    <Form.Input fluid
                        label='Zip Code'
                        placeholder='Zip Code'
                        value={this.state.zipcode}
                        onChange={this.handleInputChange.bind(this, "zipcode")}
                    />
                </Form.Group>

                <Header as='h4'>
                    <Icon name='users' /> Roles
                </Header>
                <Segment>
                <Form.Group widths='4'>
                    <RoleList selectedRoles={this.state.roles} onHandleClick={this.handleRole} />
                </Form.Group>
                </Segment>

                <Button floated='right'
                    icon
                    labelPosition='left'
                    size='medium'
                    color={colorButton}
                    onClick={this.saveUser}>
                    <Icon name={iconButton} /> User
                </Button>
            </Form>
        );
    }
}

const apollo = ({user, roles, createMutate, updateMutate, isEdit}) => {
    if (isEdit) {
        if (user.loading || roles.loading) {
            return null;
        }
        // TODO: Better error handling
        else if (user.error || roles.error) {
            console.log(roles.error);
            console.log(user.error);
        }
    }
    
    const initRoles = isEdit ? roles.userRoles : [];
    const initUser = isEdit ? user.users[0] : {};
    const userRoles = Object.assign({}, initUser, {roles: initRoles});

    return (<UserForm user={userRoles} isEdit={isEdit}/>)
}

const route = (props) => {
    //props.match.params.id
    const output = 'id, userName, password, email, firstName, lastName, zipcode';
    const isEdit = !helper.isEmpty(props.match.params.id);
    const gqlBuilder = new GraphQLBuilder('user', [{
        field: "id",
        value: props.match.params.id
    }]);
    let Composed;

    if (isEdit) {
        const jointBuilder = new GraphQLBuilder('userRole');
        const jointOutput = `
        roles {
            id, role
        }`;

        Composed = compose(
            graphql(gqlBuilder.query(output), { name: 'user' }),
            graphql(jointBuilder.query(jointOutput), { name: 'roles' }),
            graphql(gqlBuilder.createMutation(output), { name: 'createMutate' }),
            graphql(gqlBuilder.updateMutation(output), { name: 'updateMutate' })
        )(apollo);
    }
    else {
        Composed = compose(
            graphql(gqlBuilder.createMutation(output), { name: 'createMutate' }),
            graphql(gqlBuilder.updateMutation(output), { name: 'updateMutate' })
        )(apollo);
    }

    return (<Composed {...props} isEdit={isEdit} />);
}

export default route;