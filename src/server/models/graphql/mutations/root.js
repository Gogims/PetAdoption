const fs = require('fs');
const path = require('path');

let mutationList = new Object();

fs.readdirSync(__dirname)
.filter(file => file !== "root.js")
.forEach(file => {
  const mutation = require(path.join(__dirname, file));
  Object.assign(mutationList, mutation);
});

module.exports = mutationList;