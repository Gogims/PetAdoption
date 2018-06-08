import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import helper from '../../helper';
import { Route } from 'react-router-dom';

class AdminHeader extends React.Component {
    render(){
        const urlPath = suffix => `/${this.props.prefix}/${suffix}`;

        const items = [
            helper.createDropDownItem("Species",  urlPath('specie')),
            helper.createDropDownItem("Colors", urlPath('color')),
            helper.createDropDownItem("Experiences", urlPath('experience')),
            helper.createDropDownItem("Reactions", urlPath('reaction')),
            helper.createDropDownItem("Status", urlPath('status')),
            helper.createDropDownItem("Ears", urlPath('ear')),
            helper.createDropDownItem("Frequencies", urlPath('frequency')),
            helper.createDropDownItem("Tails", urlPath('tail')),
            helper.createDropDownItem("Users", urlPath('users'))
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