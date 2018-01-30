import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import helper from '../../helper';
import { Route } from 'react-router-dom';

class AnimalHeader extends React.Component{
    render(){
        const items = [
            helper.createDropDownItem("Search Animals", "/animals"),
            helper.createDropDownItem("Successful Adoptions", "/success")
        ];

        const dropdown = () => (
            <Route render={({ history }) => (
                <Dropdown onClick={() => { history.push('/')}} 
                    text="Animals" 
                    options={items} 
                    simple 
                    item
                    />
            )} />
          );

        return dropdown();
    }
}

export default AnimalHeader;