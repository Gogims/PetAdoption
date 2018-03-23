import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import helper from '../../helper';
import { Route } from 'react-router-dom';

class AdminHeader extends React.Component {
    render(){
        const items = [
            helper.createDropDownItem("Specie", "/specie"),
            helper.createDropDownItem("Color", "/color"),
            helper.createDropDownItem("Experience", "/experience"),
            helper.createDropDownItem("Reaction", "/reaction"),
            helper.createDropDownItem("Status", "/status"),
            helper.createDropDownItem("Ear", "/ear"),
            helper.createDropDownItem("Frequency", "/frequency"),
            helper.createDropDownItem("Tail", "/tail"),
            helper.createDropDownItem("Role", "/role"),
            helper.createDropDownItem("User", "/userform")
        ];

        const dropdown = () => (
            <Route render={({ history }) => (
                <Dropdown onClick={() => { history.push('/')}} 
                    text="Admin" 
                    options={items} 
                    simple 
                    item
                    />
            )} />
          );

        return dropdown();
    }
}

export default AdminHeader;