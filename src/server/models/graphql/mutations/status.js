const statusOutput = require('../queries/statusType');
const statusInput = require('../inputs/statusType');
const { GraphQLNonNull } = require('graphql');
const Status = require('../../status');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../queries/deleted');
const db = require('../../sequelize/db');

const statusMutation = {
    createStatus: {
        type:  statusOutput.type,
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
        type: statusOutput.type,
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