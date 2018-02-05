import React from 'react';
import { Menu } from 'semantic-ui-react';

class SideBar extends React.Component{
    render(){

        return(
            <div>
                <Menu.Item name='home'>Home</Menu.Item>
            </div>                
        );
    }
}

export default SideBar;