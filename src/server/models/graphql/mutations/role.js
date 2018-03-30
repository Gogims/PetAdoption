const roleOutput = require('../queries/roleType');
const roleInput = require('../inputs/roleType');
const { GraphQLNonNull } = require('graphql');
const Role = require('../../role');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../queries/deleted');
const db = require('../../sequelize/db');

const roleMutation = {
    createRole: {
        type:  roleOutput.type,
        description: "Creates a new role",
        args:{
            input: {
                type: new GraphQLNonNull(roleInput)
            }
        },
        resolve: (root, {input}, context) => {
            const role = new Role(null, input.role);
            return role.create();
        }
    },
    updateRole: {
        type: roleOutput.type,
        description: "Updates an existing role",
        args:{
            input:{
                type: new GraphQLNonNull(roleInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const role = new Role(input.id, input.role);
            return role.update();
        }
    },
    deleteRole: {
        type: deletedType,
        description: "Deletes an existing role",
        args:{
            input:{
                type: new GraphQLNonNull(roleInput)
            }
        },
        resolve: (root, {input}, context) => {
            const role = new Role(input.id);
            return role.delete();
        }
    }
}

module.exports = roleMutation;