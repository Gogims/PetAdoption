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

        //TODO: Use object spread
        this.state = {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            password: user.password,
            email: user.email,
            zipcode: user.zipcode,
            roles: user.roles
        };

        console.log(props);

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
        console.log(this.props);
    }

    render() {
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
                    color="green"
                    onClick={this.saveUser}>
                    <Icon name='add' /> User
                </Button>
            </Form>
        );
    }
}

const apollo = ({user, roles, createMutate, updateMutate}) => {
    if (roles.loading) {
        return null;
    }
    // TODO: Better error handling
    else if (roles.error) {
        console.log(props.data.error);
    }
    
    const selectedRoles = Array.isArray(roles.userRoles) ? roles.userRoles : [];
    const userRoles = Array.isArray(user.users) ? 
    Object.assign({}, user.users[0], {roles: selectedRoles}) : 
    {};


    return (<UserForm user={userRoles} />)
}

const route = (props) => {
    //props.match.params.id
    const output = 'id, userName, password, email, firstName, lastName, zipcode';
    const jointBuilder = new GraphQLBuilder('userRole');
    const jointOutput = `
    roles {
        id, role
    }`;
    let where = [];

    if (!helper.isEmpty(props.match.params.id)) {
        const value = props.match.params.id;
        const field = "id";

        where = [{field, value}];
    }
    const gqlBuilder = new GraphQLBuilder('user', where);
    
    const Composed = compose(
        graphql(gqlBuilder.query(output), {name: 'user'}),
        graphql(jointBuilder.query(jointOutput), { name: 'roles'}),
        graphql(gqlBuilder.createMutation(output), { name: 'createMutate'}),
        graphql(gqlBuilder.updateMutation(output), { name: 'updateMutate'})
    )(apollo);

    return (<Composed {...props} />);
}

export default route;