const statusType = require('../types/status');
const statusInput = require('../types/inputs/status');
const { GraphQLNonNull } = require('graphql');
const Status = require('../../status');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const statusMutation = {
    createStatus: {
        type:  statusType,
        description: "Creates a new status",
        args:{
            input: {
                type: new GraphQLNonNull(statusInput)
            }
        },
        resolve: (root, {input}, context) => {
            const status = new Status(null, input.status);
            return status.create();
        }
    },
    updateStatus: {
        type: statusType,
        description: "Updates an existing status",
        args:{
            input:{
                type: new GraphQLNonNull(statusInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const status = new Status(input.id, input.status);
            return status.update();
        }
    },
    deleteStatus: {
        type: deletedType,
        description: "Deletes an existing status",
        args:{
            input:{
                type: new GraphQLNonNull(statusInput)
            }
        },
        resolve: (root, {input}, context) => {
            const status = new Status(input.id);
            return status.delete();
        }
    }
}

module.exports = statusMutation;