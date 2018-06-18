const experienceType = require('../types/experience');
const experienceInput = require('../types/inputs/experience');
const { GraphQLNonNull } = require('graphql');
const Experience = require('../../experience');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');
const Auth = require('../authentication');

const experienceMutation = {
    createExperience: {
        type:  experienceType,
        description: "Creates a new experience",
        args:{
            input: {
                type: new GraphQLNonNull(experienceInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context) => {
            const experience = new Experience(null, input.experience);
            return experience.create();
        })
    },
    updateExperience: {
        type: experienceType,
        description: "Updates an existing experience",
        args:{
            input:{
                type: new GraphQLNonNull(experienceInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context, info) => {
            const experience = new Experience(input.id, input.experience);
            return experience.update();
        })
    },
    deleteExperience: {
        type: deletedType,
        description: "Deletes an existing experience",
        args:{
            input:{
                type: new GraphQLNonNull(experienceInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context) => {
            const experience = new Experience(input.id);
            return experience.delete();
        })
    }
}

module.exports = experienceMutation;