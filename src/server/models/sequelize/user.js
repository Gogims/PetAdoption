module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(40)
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    zipcode: {
      type: DataTypes.INTEGER
    }
  });

  Users.associate = models => {
    Users.belongsToMany(models.role, { through: 'UserRole' });
  };

  return Users;
};