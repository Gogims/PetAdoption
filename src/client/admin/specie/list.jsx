import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function SpecieList({data}) {
    if (data.loading || data.error) {
        return null;
    }

    return (
      <ul>
        {data.species.map(({ id, specie }) => (
          <li key={id}>{specie}</li>
        ))}
      </ul>
    );
}

const enhancerFunction = graphql(gql`
query{
    species{
      id,
      specie
    }
  }
`);
  
export default enhancerFunction(SpecieList);