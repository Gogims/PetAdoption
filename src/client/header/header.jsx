import React from 'react';
import { Menu } from 'semantic-ui-react';
import HomeMenu from './home';

class Header extends React.Component{
    render(){
        return(
            <Menu>
                <HomeMenu/>
            </Menu>
        );
    }
}

export default Header;