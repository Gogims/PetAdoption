module.exports = (sequelize, DataTypes) => {
  const GuestBooks = sequelize.define('guestbook', {
    name: {
      type: DataTypes.STRING(50)
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50)
    },
    approved: {
      type: DataTypes.BOOLEAN
    }
  });

  return GuestBooks;
};