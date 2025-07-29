module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Attendance;
}; 