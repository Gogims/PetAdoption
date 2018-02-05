import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import HomeMenu from './home';
import FeatureMenu from './features';
import AnimalMenu from './animal';

// TODO: Make a component that creates components
class Header extends React.Component{
    render(){
        return(
            <Menu fixed="top">
                <HomeMenu/>
                <FeatureMenu/>
                <AnimalMenu/>
            </Menu>
        );
    }
}

export default Header;