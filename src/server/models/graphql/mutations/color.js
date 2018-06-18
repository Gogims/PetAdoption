const colorType = require('../types/color');
const colorInput = require('../types/inputs/color');
const { GraphQLNonNull } = require('graphql');
const Color = require('../../color');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');
const Auth = require('../authentication');

const colorMutation = {
    createColor: {
        type:  colorType,
        description: "Creates a new color",
        args:{
            input: {
                type: new GraphQLNonNull(colorInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context) => {
            const color = new Color(null, input.color);
            return color.create();
        })
    },
    updateColor: {
        type: colorType,
        description: "Updates an existing color",
        args:{
            input:{
                type: new GraphQLNonNull(colorInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context, info) => {
            const color = new Color(input.id, input.color);
            return color.update();
        })
    },
    deleteColor: {
        type: deletedType,
        description: "Deletes an existing color",
        args:{
            input:{
                type: new GraphQLNonNull(colorInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context) => {
            const color = new Color(input.id);
            return color.delete();
        })
    }
}

module.exports = colorMutation;