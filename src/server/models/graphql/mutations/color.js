const colorType = require('../types/color');
const colorInput = require('../types/inputs/color');
const { GraphQLNonNull } = require('graphql');
const Color = require('../../color');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const colorMutation = {
    createColor: {
        type:  colorType,
        description: "Creates a new color",
        args:{
            input: {
                type: new GraphQLNonNull(colorInput)
            }
        },
        resolve: (root, {input}, context) => {
            const color = new Color(null, input.color);
            return color.create();
        }
    },
    updateColor: {
        type: colorType,
        description: "Updates an existing color",
        args:{
            input:{
                type: new GraphQLNonNull(colorInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const color = new Color(input.id, input.color);
            return color.update();
        }
    },
    deleteColor: {
        type: deletedType,
        description: "Deletes an existing color",
        args:{
            input:{
                type: new GraphQLNonNull(colorInput)
            }
        },
        resolve: (root, {input}, context) => {
            const color = new Color(input.id);
            return color.delete();
        }
    }
}

module.exports = colorMutation;