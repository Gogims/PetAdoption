const reactionType = require('../types/reaction');
const reactionInput = require('../types/inputs/reaction');
const { GraphQLNonNull } = require('graphql');
const Reaction = require('../../reaction');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');
const Auth = require('../authentication');

const reactionMutation = {
    createReaction: {
        type:  reactionType,
        description: "Creates a new reaction",
        args:{
            input: {
                type: new GraphQLNonNull(reactionInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context) => {
            const reaction = new Reaction(null, input.reaction);
            return reaction.create();
        })
    },
    updateReaction: {
        type: reactionType,
        description: "Updates an existing reaction",
        args:{
            input:{
                type: new GraphQLNonNull(reactionInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context, info) => {
            const reaction = new Reaction(input.id, input.reaction);
            return reaction.update();
        })
    },
    deleteReaction: {
        type: deletedType,
        description: "Deletes an existing reaction",
        args:{
            input:{
                type: new GraphQLNonNull(reactionInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context) => {
            const reaction = new Reaction(input.id);
            return reaction.delete();
        })
    }
}

module.exports = reactionMutation;