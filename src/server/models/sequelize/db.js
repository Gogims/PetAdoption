const Sequelize = require('sequelize');
const path = require('path');
const config = require('../../config/config')[process.env.NODE_ENV];
const fs = require('fs');

const sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = new Object();

fs.readdirSync(__dirname)
.filter(file => {
  return (file.indexOf(".") !== 0) && (file !== "db.js");
})
.forEach(file => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync();

module.exports = db;

