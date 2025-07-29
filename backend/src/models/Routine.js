module.exports = (sequelize, DataTypes) => {
  const Routine = sequelize.define('Routine', {
    day: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Routine;
}; 