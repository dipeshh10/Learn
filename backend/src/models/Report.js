module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    grades: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'reports'
  });

  // Example association (if needed)
  Report.associate = models => {
    Report.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
  };

  return Report;
};
