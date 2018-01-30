import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import helper from '../../helper';
import { Route } from 'react-router-dom';

class HomeHeader extends React.Component{
    render(){
        const items = [
            helper.createDropDownItem("About Us", "/about"),
            helper.createDropDownItem("Contact Us", "/contact")
        ];

        const dropdown = () => (
            <Route render={({ history }) => (
                <Dropdown onClick={() => { history.push('/')}} 
                    text="Home" 
                    options={items} 
                    simple 
                    item
                    />
            )} />
          );

        return dropdown();
    }
}

export default HomeHeader;