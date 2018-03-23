import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import GraphQLBuilder from '../graphqlBuilder';

class RoleList extends React.Component {
    constructor(props) {
        this.markSelected = this.markSelected.bind(this);
    }

    markSelected() {
        const roleIds = this.props.selectedRoles.map(role => role.id);
        const selected = new Set(roleIds);

        return this.props.data.roles.map(role => {
            if (selected.has(role.id)) {
                return {
                    ...role,
                    selected: true
                };
            }

            return role;
        });
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
                <Checkbox label={role.role} checked={role.selected} />
            )
        )
    }
}

const gqlBuilder = new GraphQLBuilder('role');
const output = 'id, role';

export default compose(
    graphql(gqlBuilder.query(output)),
    graphql(gqlBuilder.createMutation(output), { name: 'createMutate'}),
    graphql(gqlBuilder.updateMutation(output), { name: 'updateMutate'})
)(TableComponent);