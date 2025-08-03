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
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grades: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxMarks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    examDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reportType: {
      type: DataTypes.ENUM('Exam', 'Assignment', 'Project', 'Quiz'),
      allowNull: false,
      defaultValue: 'Exam'
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    tableName: 'reports'
  });

  Report.associate = function(models) {
    // Report belongs to Student
    Report.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student'
    });
    
    // Report belongs to User (creator)
    Report.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });
  };

  return Report;
}; 