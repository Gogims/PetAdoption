import helper from '../../helper';
import gql from 'graphql-tag';

class GraphQLBuilder {
    constructor(entity) {
        this.entity = entity;
        this.capitalize = helper.capitalizeWord(entity);
        this.plural = helper.pluralize(entity);

        this.query = this.query.bind(this);
    }

    query(output) {
        const query = `
        query{
            ` + this.plural + `{
              ` + output + `
            }
          }
        `

        return gql(query);
    }

    createMutation(output) {
        const mutation = `
        mutation ($entity: ` + this.capitalized + `Input!) {
            create` + this.capitalized + `(input: $entity) {
              ` + output + `
            }
          }
        `

        return gql(mutation);
    }

    updateMutation(output) {
        const mutation = `
        mutation ($entity: ` + this.capitalized + `Input!) {
            update` + this.capitalized + `(input: $entity) {
              ` + output + `
            }
          }
        `

        return gql(mutation);
    }

    deleteMutation() {
        const mutation = `
        mutation ($entity: ` + this.capitalized + `Input!) {
            delete` + this.capitalized + `(input: $entity) {
              status,
              message
            }
          }
        `

        return gql(mutation);
    }
}

export default GraphQLBuilder;