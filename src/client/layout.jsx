import React from 'react';
import Main from './main';
import Header from './header/header';
import { Sidebar, Segment, Menu, Container } from 'semantic-ui-react';
import SideBar from './sidebar/sidebar';

class Layout extends React.Component{
    render(){
        return(
            <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} animation="push" visible={true} vertical>
                    <SideBar/>
                </Sidebar>
                <Sidebar.Pusher className="main">
                    <Segment basic>
                        <Header/>
                        <Container fluid className="mainContent">
                            <Main />
                        </Container>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default Layout;