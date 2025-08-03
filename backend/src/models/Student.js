module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fees: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    tableName: 'students'
  });

  Student.associate = function(models) {
    // Student has many attendance records
    Student.hasMany(models.Attendance, {
      foreignKey: 'studentId',
      as: 'attendanceRecords'
    });

    // Student has many fee records
    Student.hasMany(models.Fee, {
      foreignKey: 'studentId',
      as: 'feeRecords'
    });

    // Student has many reports
    Student.hasMany(models.Report, {
      foreignKey: 'studentId',
      as: 'reports'
    });

    // Student belongs to many courses (through enrollment)
    Student.belongsToMany(models.Course, {
      through: 'StudentCourses',
      foreignKey: 'studentId',
      otherKey: 'courseId',
      as: 'courses'
    });
  };

  return Student;
}; 