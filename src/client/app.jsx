import React from 'react';
import ReactDOM from 'react-dom';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Layout from './layout';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//injectTapEventPlugin();

class App extends React.Component{
  render(){
    const client = new ApolloClient({
      link: new HttpLink({ uri: 'http://localhost:3000/graphql'}),
      cache: new InMemoryCache()
    });

    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout/>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);