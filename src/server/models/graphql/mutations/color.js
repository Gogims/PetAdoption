const colorOutput = require('../queries/colorType');
const colorInput = require('../inputs/colorType');
const { GraphQLNonNull } = require('graphql');
const Color = require('../../color');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../queries/deleted');
const db = require('../../sequelize/db');

const colorMutation = {
    createColor: {
        type:  colorOutput.type,
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
        type: colorOutput.type,
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