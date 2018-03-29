import helper from '../../helper';
import gql from 'graphql-tag';

class GraphQLBuilder {
    constructor(entity, filter=[]) {
        this.entity = entity;
        this.capitalize = helper.capitalizeWord(entity);
        this.plural = helper.pluralize(entity);
        this.filter = filter;

        this.query = this.query.bind(this);
        this.createMutation = this.createMutation.bind(this);
        this.updateMutation = this.updateMutation.bind(this);
        this.deleteMutation = this.deleteMutation.bind(this);
    }

    query(output) {
      const statement = this.filter.reduce((acc, val) => {
        return acc + val.field + ': "' + val.value + '",';
      }, '');
      let where = '';

      if (!helper.isEmpty(statement)) {
        where = '(where: {' + statement.slice(0, -1) + '})';
      }

      const query = `
      query {
          ` + this.plural + where + `{
            ` + output + `
          }
        }
      `

      return gql(query);
    }

    createMutation(output) {
        const mutation = `
        mutation ($entity: ` + this.capitalize + `Input!) {
            create` + this.capitalize + `(input: $entity) {
              ` + output + `
            }
          }
        `

        return gql(mutation);
    }

    updateMutation(output) {
        const mutation = `
        mutation ($entity: ` + this.capitalize + `Input!) {
            update` + this.capitalize + `(input: $entity) {
              ` + output + `
            }
          }
        `

        return gql(mutation);
    }

    deleteMutation() {
        const mutation = `
        mutation ($entity: ` + this.capitalize + `Input!) {
            delete` + this.capitalize + `(input: $entity) {
              status,
              message
            }
          }
        `

        return gql(mutation);
    }
}

export default GraphQLBuilder;