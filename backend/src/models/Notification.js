
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Notification;
}; 
