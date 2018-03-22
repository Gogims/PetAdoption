const roleOutput = require('../outputs/roleType');
const roleInput = require('../inputs/roleType');
const { GraphQLNonNull } = require('graphql');
const Role = require('../../role');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../outputs/deleted');
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
            const role = new Role(null, input.role, input.userId);
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
            const role = new Role(input.id, input.role, input.userId);
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