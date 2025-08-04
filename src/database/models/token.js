'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
      return this.user_id === userId;
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
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      tokenKey: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        field: 'token_key'
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Token value cannot be empty'
          }
        }
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at',
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeValidate: (token) => {
          // default 1d
          if (!token.expiresAt) {
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 24);
            token.expiresAt = expiration;
          }
        }
      }
    }
  );

  return Token;
};
