module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('status', {
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });

  Status.associate = models => {
    Status.hasMany(models.pet, {
      foreignKey: { 
        name: "statusId"
      }
    });
  };

  return Status;
};