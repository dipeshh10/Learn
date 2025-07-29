module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grades: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Report;
}; 