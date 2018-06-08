import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import TableBody from './tableBody';
import { graphql } from 'react-apollo';
import helper from '../helper';

class TablePagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        };

        this.capitalize = helper.capitalizeWord(props.entity);

        this.fetchMore = this.fetchMore.bind(this);
    }

    fetchMore(pageNumber) {
        const page = pageNumber < 1 ? 1 : pageNumber;

        this.props.data.fetchMore({
            variables: {
                offset: (page * this.props.pageSize) - this.props.pageSize
            }, 
            updateQuery: (prev, { fetchMoreResult }) => {
                return fetchMoreResult;
            }
        });

        this.setState({
            page: page
        });
    }

    render() {
        if(this.props.data.loading) {
            return null;
        }
        const pagination = this.props.data[`pagination${this.capitalize}`];
        const pages = Math.ceil(pagination.count / this.props.pageSize);

        const rows = pagination[this.props.entity]
            .map(entity => Object.values(entity));

        const pageNumber = [];

        for (let index = 1; index < 5; index++) {
            pageNumber.push(
                <Menu.Item key={index} 
                    disabled={index === this.state.page} 
                    onClick={this.fetchMore.bind(this, index)} 
                    as='a'>
                    { index }
                </Menu.Item>
            );
        }

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {
                            this.props.header.map((header, index) => 
                                <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
                            )
                        }
                    </Table.Row>
                </Table.Header>

                <TableBody data={rows} />

                {/* TODO: Create a table footer component */}
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={this.props.header.length}>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' onClick={this.fetchMore.bind(this, this.state.page - 1)} icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                {
                                    pageNumber.map(page => page)
                                }
                                <Menu.Item as='a' onClick={this.fetchMore.bind(this, this.state.page + 1)} icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

export default class ApolloTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const DataTable = graphql(this.props.query, {
            options: (props) => ({
                variables: {
                    offset: 0,
                    limit: this.props.pageSize,
                    order: ''
                }
            })
        })(TablePagination);

        return (<DataTable {...this.props} />);
    }
}