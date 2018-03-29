module.exports = (sequelize, DataTypes) => {
  const Breeds = sequelize.define('breed', {
    breed: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });
  
  Breeds.associate = models => {
    Breeds.belongsTo(models.specie, {
      as: 'specie',
      foreignKey: { 
        name: "specieId",
        allowNull: false 
      }
    });

    Breeds.belongsToMany(models.pet, {through: 'breedPet'});
  }


  return Breeds;
};