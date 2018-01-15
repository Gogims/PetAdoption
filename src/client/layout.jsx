import React from 'react';
import Main from './main';
import Header from './header/header';

class Layout extends React.Component{
    render(){
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        );
    }
}

export default Layout;