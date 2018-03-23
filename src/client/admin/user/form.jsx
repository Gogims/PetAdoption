import React from 'react';
import { Form } from 'semantic-ui-react';

class UserForm extends React.Component {
    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input  label='First Name' placeholder='First Name' />
                    <Form.Input  label='Last Name' placeholder='Last Name' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='User Name' placeholder='User Name' />
                    <Form.Input fluid label='Password' placeholder='Password' type='password' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email' placeholder='Email' />
                    <Form.Input fluid label='Zip Code' placeholder='Zip Code' />
                </Form.Group>
            </Form>
        );
    }
}

export default UserForm;