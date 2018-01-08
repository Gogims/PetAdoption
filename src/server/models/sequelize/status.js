module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('status', {
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });

  return Status;
};