module.exports = (sequelize, DataTypes) => {
  const Fee = sequelize.define('Fee', {
    studentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Fee;
}; 