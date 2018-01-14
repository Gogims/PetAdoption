import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import SpecieList from './admin/specie/list';

class Main extends React.Component{
  render(){
    return (
      <main>
        <Switch>
          <Route exact path='/' component={SpecieList}/>
          {/* <Route path='/roster' component={Roster}/> */}
        </Switch>
      </main>
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