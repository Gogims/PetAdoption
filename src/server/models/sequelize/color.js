module.exports = (sequelize, DataTypes) => {
    const Colors = sequelize.define('color', {
        color: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
  
    return Colors;
};