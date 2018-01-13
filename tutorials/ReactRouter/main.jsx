import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './home';
import FullRoster from './fullRoster';
import Schedule from './schedule';
import Player from './player';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)

const Roster = () => (
  <div>
    <h2>This is a roster page!</h2>
    <Switch>
      <Route exact path='/roster' component={FullRoster}/>
      <Route path='/roster/:number' component={Player}/>
    </Switch>
  </div>
)

export default Main;