import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

class SimpleForm extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            name: event.target.value
        });
    }

    handleSubmit(){
        const isUpdate = this.props.id !== undefined;

        if (isUpdate) {
            axios.put("http://localhost:3000/api/" + this.props.name + '/' + this.props.id, {
                [this.props.name]: this.state.name
            }).then(response => {
                console.log(response);
            }).catch(error => console.log(error));
        }
        else{
            axios.post("http://localhost:3000/api/" + this.props.name, {
                [this.props.name]: this.state.name
            }).then(response => {
                console.log(response);
            }).catch(error => console.log(error));
        }
    }
    
    render(){
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>{this.props.name}</label>
                    <input placeholder={this.props.name} name={this.props.name} value={this.props.value} onChange={this.handleChange}/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}

export default SimpleForm;