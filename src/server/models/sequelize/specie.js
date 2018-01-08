module.exports = (sequelize, DataTypes) => {
  const Species = sequelize.define('specie', {
    specie: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });
  
  Species.associate = models => {
    Species.breeds = Species.hasMany(models.breed, {
      as: 'breeds',
      foreignKey: { 
        name: "specieId",
        allowNull: false 
      }
    });
  };

  return Species;
};