module.exports = (sequelize, DataTypes) => {
  const LearningMaterial = sequelize.define('LearningMaterial', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return LearningMaterial;
}; 