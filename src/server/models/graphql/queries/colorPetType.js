const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const colorOutput = require('./colorType');
const petOutput = require('./petType');
const ColorPet = require('../../colorPet');

const colorPetType = new GraphQLObjectType({
    name: 'ColorPet',
    description: 'Joint table between Colors and Pets',
    fields: {
        pets: {
            type: petOutput.type,
            resolve: (colorPet, args, context) => {
                return context.db.pet.findById(colorPet.petId);
            }
        },
        colors: {
            type: colorOutput.type,
            resolve: (colorPet, args, context) => {
                return context.db.color.findById(colorPet.colorId);
            }
        }
    }
  });
  
  module.exports = {
    type: colorPetType,
    schema: {
      type: new GraphQLList(colorPetType),
      resolve: (_, args) => {
        const colorPet = new ColorPet(args);
        return colorPet.findAll();
      },
      args: {
          colorIds: {
              type: new GraphQLList(GraphQLID)
          },
          petIds: {
              type: new GraphQLList(GraphQLID)
          }
      }
    }
  };