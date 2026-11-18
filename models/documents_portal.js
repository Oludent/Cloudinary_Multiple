'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents_Portal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Documents_Portal.init({
  id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      displayPicture: {
        type: DataTypes.STRING,
        allowNull: true
      },
      documents: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'Documents_Portal',
    tableName: 'Documents_Portals',
    timestamps: true
  });
  return Documents_Portal;
};