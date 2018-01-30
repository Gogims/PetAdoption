import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import helper from '../../helper';
import { Route } from 'react-router-dom';

class FeatureHeader extends React.Component{
    render(){
        const items = [
            helper.createDropDownItem("Shop", "/shop"),
            helper.createDropDownItem("Guestbook", "/guestbook")
        ];

        const dropdown = () => (
            <Route render={({ history }) => (
                <Dropdown onClick={() => { history.push('/')}} 
                    text="Website Features" 
                    options={items} 
                    simple 
                    item
                    />
            )} />
          );

        return dropdown();
    }
}

export default FeatureHeader;