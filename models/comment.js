const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    idComment: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // Automatically generate UUID
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    idArtikel: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'artikel',
        key: 'idArtikel'
      }
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
    tableName: 'comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idComment" },
        ]
      },
      {
        name: "idArtikel",
        using: "BTREE",
        fields: [
          { name: "idArtikel" },
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
