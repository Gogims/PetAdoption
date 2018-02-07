import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleEntity from './entity';

class SimpleTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data.loading || this.props.data.error) {
      return null;
    }

    return (
      <ul>
        {this.props.data.species.map(({ id, specie }) => (
          <li key={id}>{specie}</li>
        ))}
      </ul>
    );
  }
}

//export default enhancerFunction(SpecieList);
export default SimpleTable;