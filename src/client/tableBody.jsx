import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class TableBody extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(id) {
        this.props.history.push(`/admin/user/${ id }`);
    }

    render() {
        if (!this.props.data) {
            return null;
        }

        const idColumn = 0;

        return (
            <Table.Body>
                {
                    this.props.data.map((data, index) => {
                        return (
                            <Table.Row key={data[idColumn]} className="clickable" onClick={this.handleClick.bind(this, data[idColumn])}>
                                {
                                    data.map((cell, indx) => {
                                        if (indx !== 0) {
                                            return <Table.Cell key={indx}>{cell}</Table.Cell>
                                        }
                                    })
                                }
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        )
    }
}

export default withRouter(TableBody);