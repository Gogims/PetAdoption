import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import Layout from '../layout';

// TODO: Make a component that creates components
class SideBar extends React.Component{
    render(){
        const test = (
            <ul>
                <li>Test 1</li>
                <li>Test 2 </li>
            </ul>
        );

        return(
            <Sidebar animation="push">
                <Sidebar.Pushable content={test} />
                <Sidebar.Pusher content={<Layout/> } />
            </Sidebar>
        );
    }
}

export default SideBar;