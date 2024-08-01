const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    idUser: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // Automatically generate UUID
    },
    gender: {
      type: DataTypes.ENUM('male','female'),
      allowNull: false
    },
    idAuth: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'auth',
        key: 'idAuth'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "idAuth",
        using: "BTREE",
        fields: [
          { name: "idAuth" },
        ]
      },
    ]
  });
};
