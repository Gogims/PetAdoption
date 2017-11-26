import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FilterableProductTable from './ProductTable/filterableProductTable';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

function App(){
  return (
  <MuiThemeProvider>
    <FilterableProductTable />
  </MuiThemeProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
