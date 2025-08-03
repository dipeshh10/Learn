module.exports = (sequelize, DataTypes) => {
  const LearningMaterial = sequelize.define('LearningMaterial', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Video', 'Document', 'Link', 'YouTube'),
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING,
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
    courseId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    tableName: 'learning_materials'
  });

  LearningMaterial.associate = function(models) {
    // LearningMaterial belongs to User (creator)
    LearningMaterial.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });

    // LearningMaterial belongs to Teacher
    LearningMaterial.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    });

    // LearningMaterial belongs to Course
    LearningMaterial.belongsTo(models.Course, {
      foreignKey: 'courseId',
      as: 'course'
    });
  };

  return LearningMaterial;
}; 