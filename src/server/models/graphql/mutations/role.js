const roleType = require('../types/role');
const roleInput = require('../types/inputs/role');
const { GraphQLNonNull } = require('graphql');
const Role = require('../../role');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const roleMutation = {
    createRole: {
        type:  roleType,
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
        type: roleType,
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