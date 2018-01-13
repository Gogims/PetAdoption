import React from 'react';
import ReactDOM from 'react-dom';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './main';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

const App = () => (
  <div>
    <Header></Header>
    <Main></Main>
  </div>
)

function Root(){
  return (
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
