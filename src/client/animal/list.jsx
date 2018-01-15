import React from 'react';
import { Item } from 'semantic-ui-react';
import Animal from './animal';

class AnimalList extends React.Component{
    render(){

        return (
            <Item.Group divided>
                <Animal />
                <Animal />
            </Item.Group>
        )
    }
}

export default AnimalList;