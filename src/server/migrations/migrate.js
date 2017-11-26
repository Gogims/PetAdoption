const db = require(__dirname + '/../models/db');
const Users = require(__dirname + '/../models/user');
// Also adds breeds table
const Species = require(__dirname + '/../models/specie');

db.sync();