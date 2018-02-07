import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import HomeMenu from './home';
import FeatureMenu from './features';
import AnimalMenu from './animal';
import AdminMenu from './admin';

// TODO: Make a component that creates components?
class Header extends React.Component{
    render(){
        return(
            <Menu fixed="top">
                <HomeMenu/>
                <FeatureMenu/>
                <AnimalMenu/>
                <AdminMenu/>
            </Menu>
        );
    }
}

export default Header;