module.exports = (sequelize, DataTypes) => {
    const Ears = sequelize.define('ear', {
        earType: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });

    Ears.associate = models => {
        Ears.hasMany(models.pet, {
            foreignKey: "earId"
        });
    };
  
    return Ears;
};