module.exports = (sequelize, DataTypes) => {
    const Experiences = sequelize.define('experience', {
        ownerExperience: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
  
    return Experiences;
};