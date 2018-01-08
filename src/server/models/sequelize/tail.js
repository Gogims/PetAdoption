module.exports = (sequelize, DataTypes) => {
    const Tails = sequelize.define('tail', {
        tailType: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
  
    return Tails;
};