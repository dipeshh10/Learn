module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '1 semester'
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'teachers',
        key: 'id'
      }
    },
    teacherName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level: {
      type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
      allowNull: false,
      defaultValue: 'Beginner'
    },
    maxStudents: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30
    },
    currentStudents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    syllabus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prerequisites: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'courses'
  });

  Course.associate = function(models) {
    // Course belongs to Teacher
    Course.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    });
    
    // Course has many students (through enrollment)
    Course.belongsToMany(models.Student, {
      through: 'StudentCourses',
      foreignKey: 'courseId',
      otherKey: 'studentId',
      as: 'students'
    });
    
    // Course has many routines
    Course.hasMany(models.Routine, {
      foreignKey: 'courseId',
      as: 'routines'
    });
    
    // Course has many learning materials
    Course.hasMany(models.LearningMaterial, {
      foreignKey: 'courseId',
      as: 'learningMaterials'
    });
  };

  return Course;
};
