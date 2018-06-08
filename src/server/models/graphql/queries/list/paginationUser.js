const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const userType = require('../../types/user');
const pagination = require('./pagination');

module.exports = pagination(userType);