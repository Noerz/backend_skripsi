const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    idAdmin: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // Automatically generate UUID
    },
    nik: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: "nik",
      defaultValue: ''
    },
    gender: {
      type: DataTypes.ENUM('male','female'),
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.ENUM('active','inactive'),
      allowNull: false,
      defaultValue: 'inactive'
    },
    idAuth: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'auth',
        key: 'idAuth'
      }
    },
    idDivision: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'division',
        key: 'idDivision'
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
    tableName: 'admin',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAdmin" },
        ]
      },
      {
        name: "nik",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nik" },
        ]
      },
      {
        name: "idAuth",
        using: "BTREE",
        fields: [
          { name: "idAuth" },
        ]
      },
      {
        name: "idDivision",
        using: "BTREE",
        fields: [
          { name: "idDivision" },
        ]
      },
    ]
  });
};
