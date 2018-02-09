import React from 'react';
import { Table, Button, Icon, Input } from 'semantic-ui-react';

class SimpleTableBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            valueChanged: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            valueChanged: this.state.value !== nextProps.value
        })
    }

    handleChange($event, data) {

        this.setState({
            value: data.value,
            valueChanged: this.props.value !== data.value
        });
    }

    handleCreate() {
        this.props.onHandleCreate(this.props.id, this.state.value);
    }

    handleUpdate() {
        this.props.onHandleUpdate(this.props.id, this.state.value);
    }

    render() {
        const button = this.props.new ?
        (
            <Button fluid 
                    disabled={!this.state.valueChanged} 
                    color="green"
                    onClick={this.handleCreate}>
                <Icon name="add" />
            </Button>
        ) : 
        (
            <Button fluid 
                    disabled={!this.state.valueChanged} 
                    color="blue"
                    onClick={this.handleUpdate}>
                <Icon name="edit" />
            </Button>
        );

        return (
            <Table.Row>
                <Table.Cell>
                    <Input value={this.state.value} onChange={this.handleChange} fluid/>
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