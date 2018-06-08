import React from 'react';
import TablePagination from '../../tablePagination';
import GraphQLBuilder from '../graphQLBuilder';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.gqlBuilder = new GraphQLBuilder('user');
        this.pageSize = 5;
    }

    render() {
        const fields = 'id, userName, firstName, lastName, email';

        return <TablePagination
            header={['User Name', 'First Name', 'Last Name', 'Email']}
            pageSize={this.pageSize}
            entity={'users'}
            fields={['userName', 'firstName', 'lastName', 'email']}
            query={this.gqlBuilder.queryPagination(fields)}
        />
    }
}