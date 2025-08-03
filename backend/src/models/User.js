module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'teacher', 'student'),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'users'
  });

  User.associate = function(models) {
    // User has many learning materials (as creator)
    User.hasMany(models.LearningMaterial, {
      foreignKey: 'createdBy',
      as: 'learningMaterials'
    });
    
    // User has many routines (as creator)
    User.hasMany(models.Routine, {
      foreignKey: 'createdBy',
      as: 'routines'
    });
    
    // User has many attendance records (as marker)
    User.hasMany(models.Attendance, {
      foreignKey: 'markedBy',
      as: 'attendanceMarked'
    });
    
    // User has many fees (as creator)
    User.hasMany(models.Fee, {
      foreignKey: 'createdBy',
      as: 'fees'
    });
    
    // User has many reports (as creator)
    User.hasMany(models.Report, {
      foreignKey: 'createdBy',
      as: 'reports'
    });
  };

  return User;
}; 