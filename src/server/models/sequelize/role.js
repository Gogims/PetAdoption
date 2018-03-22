module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('role', {
      role: {
        type: DataTypes.STRING(50)
      }
    });

    Roles.associate = models => {
        Roles.belongsTo(models.user, {
          as: 'user',
          foreignKey: { 
            name: "userId",
            allowNull: false 
          }
        });
    
        Roles.belongsToMany(models.user, {through: 'UserRole'});
      }
  
    return Roles;
  };