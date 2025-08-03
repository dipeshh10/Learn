module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('Present', 'Absent', 'Late'),
      allowNull: false,
      defaultValue: 'Present'
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'teachers',
        key: 'id'
      }
    },
    markedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    tableName: 'attendance',
    indexes: [
      {
        unique: true,
        fields: ['studentId', 'date', 'class']
      }
    ]
  });

  Attendance.associate = function(models) {
    // Attendance belongs to Student
    Attendance.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student'
    });

    // Attendance belongs to Teacher
    Attendance.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    });

    // Attendance belongs to User (who marked it)
    Attendance.belongsTo(models.User, {
      foreignKey: 'markedBy',
      as: 'marker'
    });
  };

  return Attendance;
}; 