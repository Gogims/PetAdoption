import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/home';
import About from './home/about';
import Contact from './home/contact';
import withEntity from './admin/simple/entity';
import SimpleTable from './admin/simple/table';
import UserForm from './admin/user/form';

class Main extends React.Component {
  render(){

    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/specie' component={withEntity(SimpleTable, "specie")}/>
        <Route exact path='/color' component={withEntity(SimpleTable, "color")}/>
        <Route exact path='/experience' component={withEntity(SimpleTable, "experience")}/>
        <Route exact path='/reaction' component={withEntity(SimpleTable, "reaction")}/>
        <Route exact path='/status' component={withEntity(SimpleTable, "status")}/>
        <Route exact path='/ear' component={withEntity(SimpleTable, "ear")}/>
        <Route exact path='/frequency' component={withEntity(SimpleTable, "frequency")}/>
        <Route exact path='/tail' component={withEntity(SimpleTable, "tail")}/>
        <Route exact path='/role' component={withEntity(SimpleTable, "role")}/>
        <Route exact path='/userform' component={UserForm}/>
      </Switch>
    )
  }
}

export default Main;