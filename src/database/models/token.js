'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'user'
      });
    }

    isExpired() {
      return new Date() > this.expires_at;
    }

    isRequestTokenMatched(requestToken) {
      return this.token === requestToken;
    }

    isRequestTokenUserMatched(userId) {
      return this.userId === userId;
    }

    timeUntilExpiration() {
      return this.expires_at - new Date();
    }

    async extendExpiration(hours) {
      const newExpiration = new Date();
      newExpiration.setHours(newExpiration.getHours() + hours);

      this.expires_at = newExpiration;
      return this.save();
    }
  }

  Token.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Token value cannot be empty'
          }
        }
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Must be a valid date'
          },
          isAfter: {
            args: [new Date().toISOString()],
            msg: 'Expiration date must be in the future'
          }
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        validate: {
          notEmpty: {
            msg: 'User ID cannot be empty'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['token']
        },
        {
          fields: ['expires_at']
        },
        {
          unique: true,
          fields: ['userId']
        }
      ],
      hooks: {
        beforeValidate: (token) => {
          // Set default 1d
          if (!token.expires_at) {
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 24);
            token.expires_at = expiration;
          }
        }
      }
    }
  );

  return Token;
};
