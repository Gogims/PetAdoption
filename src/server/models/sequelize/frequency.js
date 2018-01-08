module.exports = (sequelize, DataTypes) => {
    const Frequencies = sequelize.define('frequency', {
        frequency: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
  
    return Frequencies;
};