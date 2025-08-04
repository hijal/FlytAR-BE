const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users'
      });
      Role.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: 'roleId',
        as: 'permissions'
      });
    }
  }

  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      role_key: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.ENUM('Super Admin', 'Company Admin', 'Surveyor', 'Mover', 'Customer'),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Role name cannot be empty'
          },
          isIn: {
            args: [['Super Admin', 'Company Admin', 'Surveyor', 'Mover', 'Customer']],
            msg: 'Invalid role name'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [0, 255],
            msg: 'Description must be less than 255 characters'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'Roles',
      timestamps: true,
      underscored: true,
    }
  );

  return Role;
};
