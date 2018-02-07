import React from 'react';
import helper from '../../../helper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function withEntity(TableComponent, entity) {

    function constructQuery() {
        const plural = helper.pluralizeWord(entity);
        const query = `
        query{
            ` + plural + `{
              id,
              ` + entity + `
            }
          }
        `

        return gql(query);
    }

    function constructApolloComponent() {
        const graphQuery = constructQuery();

        return graphql(graphQuery);
    }

    return class extends React.Component {
        componentWillMount() {
            const ApolloTable = constructApolloComponent()(TableComponent);

            this.setState({
                apolloTable: ApolloTable
            });
        }

        render() {
            const ApolloTable = this.state.apolloTable;

            return <ApolloTable/>;
        }
    }
}

export default withEntity;