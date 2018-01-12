const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');
const breedOutput = require('./breedType');
const petOutput = require('./petType');
const BreedPet = require('../../breedPet');

const breedFn = resolver(db.pet.associations.breeds);

const breedPetType = new GraphQLObjectType({
    name: 'BreedPet',
    description: 'Joint table between Breeds and Pets',
    fields: {
        pets: {
            type: petOutput.type,
            resolve: (breedPet, args) => {
                return db.pet.findById(breedPet.petId);
            }
        },
        breeds: {
            type: breedOutput.type,
            resolve: (breedPet, args) => {
                return db.breed.findById(breedPet.breedId);
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