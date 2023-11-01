var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _auth = require("./auth");
var _comment = require("./comment");
var _division = require("./division");
var _post = require("./post");
var _todo = require("./todo");
var _user = require("./user");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var auth = _auth(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var division = _division(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var todo = _todo(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  comment.belongsTo(admin, { as: "admin", foreignKey: "admin_id"});
  admin.hasMany(comment, { as: "comments", foreignKey: "admin_id"});
  post.belongsTo(admin, { as: "admin", foreignKey: "admin_id"});
  admin.hasMany(post, { as: "posts", foreignKey: "admin_id"});
  todo.belongsTo(admin, { as: "admin", foreignKey: "admin_id"});
  admin.hasMany(todo, { as: "todos", foreignKey: "admin_id"});
  admin.belongsTo(auth, { as: "auth", foreignKey: "auth_id"});
  auth.hasMany(admin, { as: "admins", foreignKey: "auth_id"});
  user.belongsTo(auth, { as: "auth", foreignKey: "auth_id"});
  auth.hasMany(user, { as: "users", foreignKey: "auth_id"});
  admin.belongsTo(division, { as: "division", foreignKey: "division_id"});
  division.hasMany(admin, { as: "admins", foreignKey: "division_id"});
  comment.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(comment, { as: "comments", foreignKey: "post_id"});
  comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment, { as: "comments", foreignKey: "user_id"});

  return {
    admin,
    auth,
    comment,
    division,
    post,
    todo,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
