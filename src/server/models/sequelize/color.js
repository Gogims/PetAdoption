module.exports = (sequelize, DataTypes) => {
    const Colors = sequelize.define('color', {
        color: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });

    Colors.associate = models => {
        Colors.belongsToMany(models.pet, {through: 'colorPet'});
    }
  
    return Colors;
};