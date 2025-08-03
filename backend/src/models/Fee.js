module.exports = (sequelize, DataTypes) => {
  const Fee = sequelize.define('Fee', {
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Paid', 'Pending', 'Overdue'),
      allowNull: false,
      defaultValue: 'Pending'
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    paidDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'fees'
  });

  Fee.associate = function(models) {
    // Fee belongs to Student
    Fee.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student'
    });
    
    // Fee belongs to User (creator)
    Fee.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });
  };

  return Fee;
}; 