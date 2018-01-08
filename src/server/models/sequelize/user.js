module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    }
  });

  return Users;
};