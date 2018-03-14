const reactionOutput = require('../outputs/reactionType');
const reactionInput = require('../inputs/reactionType');
const { GraphQLNonNull } = require('graphql');
const Reaction = require('../../reaction');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../outputs/deleted');
const db = require('../../sequelize/db');

const reactionMutation = {
    createReaction: {
        type:  reactionOutput.type,
        description: "Creates a new reaction",
        args:{
            input: {
                type: new GraphQLNonNull(reactionInput)
            }
        },
        resolve: (root, {input}, context) => {
            const reaction = new Reaction(null, input.reaction);
            return reaction.create();
        }
    },
    updateReaction: {
        type: reactionOutput.type,
        description: "Updates an existing reaction",
        args:{
            input:{
                type: new GraphQLNonNull(reactionInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const reaction = new Reaction(input.id, input.reaction);
            return reaction.update();
        }
    },
    deleteReaction: {
        type: deletedType,
        description: "Deletes an existing reaction",
        args:{
            input:{
                type: new GraphQLNonNull(reactionInput)
            }
        },
        resolve: (root, {input}, context) => {
            const reaction = new Reaction(input.id);
            return reaction.delete();
        }
    }
}

module.exports = reactionMutation;