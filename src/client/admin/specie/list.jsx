import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import helper from '../../../helper';

function SpecieList({ data: { species } }) {
    if (helper.isEmpty(species)) {
        return null;
    }

    return (
      <ul>
        {species.map(({ id, specie }) => (
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