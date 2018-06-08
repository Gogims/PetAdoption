const { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql');
const { resolver, attributeFields, defaultListArgs } = require('graphql-sequelize');
const db = require('../../../sequelize/db');
const helper = require('../../../../../helper');

module.exports = (type) => {
    const typeName = type.name.toLowerCase();
    const pluralType = helper.pluralize(typeName);

    const paginationType = new GraphQLObjectType({
        name: `Pagination${type.name}`,
        description: `Pagination for ${type.name}`,
        fields: () => ({
            [pluralType]: {
                type: new GraphQLList(type),
                resolve: resolver(db[typeName], { list: true }),
                args: defaultListArgs(db[typeName])
            },
            count: {
                type: GraphQLInt,
                resolve: (entity, args, context, info) => {
                    return context.db[typeName].count();
                }
            }
        })
    });

    return {
        schema: {
            type: paginationType,
            resolve: (obj, args, context, info) => {
                return {};
            }
        }
    };
}