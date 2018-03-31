const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const breedOutput = require('./breedType');
const petOutput = require('./petType');
const BreedPet = require('../../breedPet');

const breedPetType = new GraphQLObjectType({
    name: 'BreedPet',
    description: 'Joint table between Breeds and Pets',
    fields: {
        pets: {
            type: petOutput.type,
            resolve: (breedPet, args, context) => {
                return context.db.pet.findById(breedPet.petId);
            }
        },
        breeds: {
            type: breedOutput.type,
            resolve: (breedPet, args, context) => {
                return context.db.breed.findById(breedPet.breedId);
            }
        }
    }
  });
  
  module.exports = {
    type: breedPetType,
    schema: {
      type: new GraphQLList(breedPetType),
      resolve: (_, args, context) => {
        const breedPet = new BreedPet(args);
        return breedPet.findAll();
      },
      args: {
          breedIds: {
              type: new GraphQLList(GraphQLID)
          },
          petIds: {
              type: new GraphQLList(GraphQLID)
          }
      }
    }
  };