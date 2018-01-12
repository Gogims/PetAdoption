module.exports = (sequelize, DataTypes) => {
    const Frequencies = sequelize.define('frequency', {
        frequency: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });

    Frequencies.associate = models => {
        Frequencies.hasMany(models.pet, {
            foreignKey: "exerciseId"
        });

        Frequencies.hasMany(models.pet, {
            foreignKey: "groomingId"
        });

        Frequencies.hasMany(models.pet, {
            foreignKey: "sheddingId"
        });
    };
  
    return Frequencies;
};