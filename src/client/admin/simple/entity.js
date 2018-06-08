import React from 'react';
import helper from '../../../helper';
import { graphql, compose } from 'react-apollo';
import GraphQLBuilder from '../graphQLBuilder';

function withEntity(TableComponent, entity) {

    return class extends React.Component {
        constructor(props) {
            super(props);

            this.output = "id, " + entity;
            this.gqlBuilder = new GraphQLBuilder(entity);
        }

        componentWillMount() {
            const ApolloTable = compose(
                graphql(this.gqlBuilder.query(this.output)),
                graphql(this.gqlBuilder.createMutation(this.output), { name: 'createMutate'}),
                graphql(this.gqlBuilder.updateMutation(this.output), { name: 'updateMutate'}),
                graphql(this.gqlBuilder.deleteMutation(this.output), { name: 'deleteMutate'})
            )(TableComponent);

            this.setState({
                apolloTable: ApolloTable
            });
        }

        render() {
            const ApolloTable = this.state.apolloTable;
            const capitalized = helper.capitalizeWord(entity);
            const plural = helper.pluralize(entity);

            return (
                <ApolloTable
                    entity={entity}
                    entities={plural}
                    capitalized={capitalized}
                    gqlRead={this.gqlBuilder.query(this.output)}
                    {...this.props} />
            );
        }
    }
}

export default withEntity;