import React from 'react';
import { Table, Button, Icon, Input } from 'semantic-ui-react';

class SimpleTableBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    handleChange($event, data) {

        this.setState({
            value: data.value
        });
    }

    handleCreate() {
        this.props.onHandleCreate(this.props.id, this.state.value);
    }

    handleUpdate() {
        this.props.onHandleUpdate(this.props.id, this.state.value);
    }

    handleDelete() {
        this.props.onHandleDelete(this.props.id);
    }

    render() {
        const isEqual = this.state.value === this.props.value;

        const button = this.props.new ?
        (
            <Button fluid 
                    disabled={isEqual} 
                    color="green"
                    onClick={this.handleCreate}>
                <Icon name="add" />
            </Button>
        ) : 
        (
            <Button fluid 
                    disabled={isEqual} 
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
                    <Button fluid color="red" onClick={this.handleDelete}>
                        <Icon name="delete"/>
                    </Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default SimpleTableBody;