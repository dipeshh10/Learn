module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
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
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    joiningDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'teachers'
  });

  Teacher.associate = function(models) {
    // Teacher has many routines
    Teacher.hasMany(models.Routine, {
      foreignKey: 'teacherId',
      as: 'routines'
    });
    
    // Teacher has many learning materials
    Teacher.hasMany(models.LearningMaterial, {
      foreignKey: 'teacherId',
      as: 'learningMaterials'
    });
    
    // Teacher has many attendance records (as marker)
    Teacher.hasMany(models.Attendance, {
      foreignKey: 'teacherId',
      as: 'attendanceMarked'
    });
    
    // Teacher has many courses
    Teacher.hasMany(models.Course, {
      foreignKey: 'teacherId',
      as: 'courses'
    });
  };

  return Teacher;
};
