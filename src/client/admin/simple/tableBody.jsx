import React from 'react';
import { Table, Button, Icon, Input } from 'semantic-ui-react';

class SimpleTableBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            valueChanged: false
        }

        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange($event, data) {

        this.setState({
            value: data.value,
            valueChanged: this.props.value !== data.value
        });
    }

    render() {
        const button = this.props.new ?
        (
            <Button fluid disabled={!this.state.valueChanged} color="green">
                <Icon name="add" />
            </Button>
        ) : 
        (
            <Button fluid disabled={!this.state.valueChanged} color="blue">
                <Icon name="edit" />
            </Button>
        );

        return (
            <Table.Row>
                <Table.Cell>
                    <Input value={this.state.value} onChange={this.onHandleChange} fluid/>
                </Table.Cell>
                <Table.Cell>
                    { button }
                </Table.Cell>
                <Table.Cell>
                    <Button fluid color="red">
                        <Icon name="delete"/>
                    </Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default SimpleTableBody;