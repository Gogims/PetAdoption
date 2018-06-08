import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home/home';
import About from './home/about';
import Contact from './home/contact';
import withEntity from './admin/simple/entity';
import SimpleTable from './admin/simple/table';
import UserForm from './admin/user/form';
import UserList from './admin/user/list';

class Main extends React.Component {
  render(){

    return (
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/about' component={ About } />
        <Route exact path='/contact' component={ Contact } />
        <Route path='/admin' component={ AdminArea } />
      </Switch>
    )
  }
}

const AdminArea = ({ match }) => {
  const adminEntity = (entity) => (
    <Route exact path={`${ match.url }/${ entity }`} component={ withEntity(SimpleTable, entity) } />
  );

  return (
    <Switch>
      { adminEntity('specie') }
      { adminEntity('color') }
      { adminEntity('experience') }
      { adminEntity('reaction') }
      { adminEntity('status') }
      { adminEntity('ear') }
      { adminEntity('frequency') }
      { adminEntity('tail') }
      { adminEntity('role') }
      <Route exact path={`${ match.url }/users`} component={ UserList } />
      <Route exact path={`${ match.url }/user/:id?`} component={ UserForm } />
    </Switch>
  )
}

export default Main;