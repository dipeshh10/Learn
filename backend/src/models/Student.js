module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Student;
}; 