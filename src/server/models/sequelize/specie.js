module.exports = (sequelize, DataTypes) => {
  const Species = sequelize.define('specie', {
    specie: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });
  
  Species.associate = models => {
    Species.hasMany(models.breed, {
      foreignKey: { 
        name: "specieId"
      }
    });
  };

  return Species;
};