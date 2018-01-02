import React from 'react';
import ReactDOM from 'react-dom';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import SimpleForm from './simpleForm/simpleForm';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

function App(){
  return (
    <SimpleForm name="specie" id="1"/>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
