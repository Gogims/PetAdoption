import React from 'react';
import { Form } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import GraphQLBuilder from '../graphqlBuilder';
import helper from '../../../helper';

class RoleList extends React.Component {
    constructor(props) {
        super(props);

        this.markSelected = this.markSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    markSelected() {
        if (helper.isEmpty(this.props.selectedRoles)) {
            return this.props.data.roles;
        }

        const roleIds = this.props.selectedRoles.map(role => role.id);
        const selected = new Set(roleIds);

        return this.props.data.roles.map(role => {
            if (selected.has(role.id)) {
                return Object.assign({}, role, {selected: true});
            }

            return role;
        });
    }

    handleChange(e, data) {
        const role = this.props.data.roles.filter(role => role.id === data.value)[0];
        const roleUpdated = Object.assign({}, role, {selected:  data.checked});
        this.props.onHandleClick(roleUpdated);
    }

    render() {
        if (this.props.data.loading) {
            return null;
        }
        // TODO: Better error handling
        else if (this.props.data.error) {
            console.log(error);
        }

        const roles = this.markSelected();

        return (
            roles.map(role =>
                <Form.Checkbox key={role.id} 
                label={role.role} 
                checked={role.selected}
                value={role.id}
                onClick={this.handleChange} />
            )
        )
    }
}

const gqlBuilder = new GraphQLBuilder('role');
const output = 'id, role';

export default graphql(gqlBuilder.query(output))(RoleList);