module.exports = (sequelize, DataTypes) => {
  const Reactions = sequelize.define('reaction', {
    reaction: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });

  return Reactions;
};