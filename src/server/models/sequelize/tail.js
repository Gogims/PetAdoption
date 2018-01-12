module.exports = (sequelize, DataTypes) => {
    const Tails = sequelize.define('tail', {
        tailType: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });

    Tails.associate = models => {
        Tails.hasMany(models.pet, {
            foreignKey: "tailId"
        });
    };
  
    return Tails;
};