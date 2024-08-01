const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kegiatan', {
    idKegiatan: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // Automatically generate UUID
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    due_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending','completed','in progress','cancelled'),
      allowNull: false
    },
    idAdmin: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'admin',
        key: 'idAdmin'
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
    tableName: 'kegiatan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idKegiatan" },
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
