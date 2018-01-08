// TODO: add animalId FK
module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define('photo', {
    path: {
      type: DataTypes.STRING
    }
  });

  return Photos;
};