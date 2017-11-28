import React from 'react';
import { Item } from 'semantic-ui-react';

class Animal extends React.Component{
    render(){
        const description = "Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their tiny stature, and even others for their massive size.";

        const ItemSection = () => (
            <Item>
                <Item.Image size='small' src='./src/assets/image.png' />

                <Item.Content>
                    <Item.Header as='a'>Cute Dog</Item.Header>
                    <Item.Description content={description} />
                </Item.Content>
            </Item>
        )
        
        return(
            <ItemSection/>
        );
    }
}

export default Animal;