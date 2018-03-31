const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const userOutput = require('./userType');
const roleOutput = require('./roleType');
const UserRole = require('../../userRole');

const userRoleType = new GraphQLObjectType({
    name: 'UserRole',
    description: 'Joint table between Users and Roles',
    fields: {
        roles: {
            type: roleOutput.type,
            resolve: (userRole, args, context) => {
                return context.db.role.findById(userRole.roleId);
            }
        },
        users: {
            type: userOutput.type,
            resolve: (userRole, args) => {
                return context.db.user.findById(userRole.userId);
            }
        }
    }
  });
  
  module.exports = {
    type: userRoleType,
    schema: {
      type: new GraphQLList(userRoleType),
      resolve: (_, args, context) => {
        const userRole = new UserRole(args);
        return userRole.findAll();
      },
      args: {
          userIds: {
              type: new GraphQLList(GraphQLID)
          },
          roleIds: {
              type: new GraphQLList(GraphQLID)
          }
      }
    }
  };