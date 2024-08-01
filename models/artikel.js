const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('artikel', {
    idArtikel: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // Automatically generate UUID
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    idAdmin: {
      type: DataTypes.CHAR(36),
      allowNull: false
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
    tableName: 'artikel',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idArtikel" },
        ]
      },
      {
        name: "idAdmin",
        using: "BTREE",
        fields: [
          { name: "idAdmin" },
        ]
      },
    ]
  });
};
