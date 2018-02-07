import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/home';
import About from './home/about';
import Contact from './home/contact';
import SpecieList from './admin/specie/list';
import withEntity from './admin/simple/entity';
import SimpleTable from './admin/simple/table';

class Main extends React.Component {
  render(){
    let SpecieAdmin = withEntity(SimpleTable, "specie");

    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/specie' component={SpecieAdmin}/>
      </Switch>
    )
  }
}

class Roster extends React.Component{
  render(){
    return (
      <div>
        <h2>This is a roster page!</h2>
        <Switch>
          <Route exact path='/roster' component={FullRoster}/>
          <Route path='/roster/:number' component={Player}/>
        </Switch>
      </div>
    )
  }
}

export default Main;