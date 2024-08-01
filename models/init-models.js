var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _artikel = require("./artikel");
var _auth = require("./auth");
var _comment = require("./comment");
var _division = require("./division");
var _kegiatan = require("./kegiatan");
var _user = require("./user");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var artikel = _artikel(sequelize, DataTypes);
  var auth = _auth(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var division = _division(sequelize, DataTypes);
  var kegiatan = _kegiatan(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  kegiatan.belongsTo(admin, { as: "idAdmin_admin", foreignKey: "idAdmin"});
  admin.hasMany(kegiatan, { as: "kegiatans", foreignKey: "idAdmin"});
  comment.belongsTo(artikel, { as: "idArtikel_artikel", foreignKey: "idArtikel"});
  artikel.hasMany(comment, { as: "comments", foreignKey: "idArtikel"});
  admin.belongsTo(auth, { as: "idAuth_auth", foreignKey: "idAuth"});
  auth.hasMany(admin, { as: "admins", foreignKey: "idAuth"});
  comment.belongsTo(auth, { as: "idAuth_auth", foreignKey: "idAuth"});
  auth.hasMany(comment, { as: "comments", foreignKey: "idAuth"});
  user.belongsTo(auth, { as: "idAuth_auth", foreignKey: "idAuth"});
  auth.hasMany(user, { as: "users", foreignKey: "idAuth"});
  admin.belongsTo(division, { as: "idDivision_division", foreignKey: "idDivision"});
  division.hasMany(admin, { as: "admins", foreignKey: "idDivision"});

  return {
    admin,
    artikel,
    auth,
    comment,
    division,
    kegiatan,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
