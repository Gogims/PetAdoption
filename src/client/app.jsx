import React from 'react';
import ReactDOM from 'react-dom';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import AnimalList from './animalList/list';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

function App(){
  return (
    <AnimalList/>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
