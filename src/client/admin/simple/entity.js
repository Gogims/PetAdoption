import React from 'react';
import helper from '../../../helper';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

function withEntity(TableComponent, entity) {
    const plural = helper.pluralizeWord(entity);
    const capitalized = helper.capitalizeWord(entity);
    
    function constructQuery() {
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

    function constructCreateMutation() {
        const mutation = `
        mutation ($entity: ` + capitalized + `Input!) {
            create` + capitalized + `(input: $entity) {
              id,
              ` + entity + `
            }
          }
        `

        return gql(mutation);
    }

    function constructUpdateMutation() {
        const mutation = `
        mutation ($entity: ` + capitalized + `Input!) {
            update` + capitalized + `(input: $entity) {
              id,
              ` + entity + `
            }
          }
        `

        return gql(mutation);
    }

    function constructDeleteMutation() {
        const mutation = `
        mutation ($entity: ` + capitalized + `Input!) {
            delete` + capitalized + `(input: $entity) {
              status,
              message
            }
          }
        `

        return gql(mutation);
    }

    return class extends React.Component {
        constructor(props) {
            super(props);
            const plural = helper.pluralizeWord(entity);

            this.state = {
                entities: plural,
                entity: entity
            };
        }

        componentWillMount() {
            const ApolloTable = compose(
                graphql(constructQuery()),
                graphql(constructCreateMutation(), { name: 'createMutate'}),
                graphql(constructUpdateMutation(), { name: 'updateMutate'}),
                graphql(constructDeleteMutation(), { name: 'deleteMutate'})
            )(TableComponent);

            this.setState({
                apolloTable: ApolloTable
            });
        }

        render() {
            const ApolloTable = this.state.apolloTable;

            return <ApolloTable
                entity={this.state.entity}
                entities={this.state.entities} 
                capitalized={capitalized}
                {...this.props}/>;
        }
    }
}

export default withEntity;