const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const Register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { name, email, password, role, gender, status, division_id } = req.body;
    console.log(email);
    const hashPassword = await bcrypt.hash(password, salt);

    const createdAuth = await models.auth.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    if (role === 'admin') {
      const body = {
        name: name,
        email: email,
        gender: gender,
        status: status,
        division_id: division_id,
        auth_id: createdAuth.id, // Assign auth_id from createdAuth
      };
      await models.admin.create(body);
    } else {
      const body = {
        name: name,
        email: email,
        gender: gender,
        auth_id: createdAuth.id, // Assign auth_id from createdAuth
      };
      await models.user.create(body);
    }

    res.status(201).json({ msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const auth = await models.auth.findAll({
      where: {
        email: req.body.email,
      }
    });
    if (!auth[0]) return res.status(400).json({ msg: "Email tidak ditemukan" });
    const match = await bcrypt.compare(req.body.password, auth[0].password)
    if (!match) return res.status(400).json({ msg: "Password Salah" });

    // Check Role Login
    let accessToken;
    if (auth[0].role == 'admin') {
      console.log('admin kontol')
      const admin = await models.admin.findAll({
        where: {
          auth_id: auth[0].id
        }
      });
      const auth_id = auth[0].id;
      const name = auth[0].name;
      const email = auth[0].email;
      const role = auth[0].role;
      const admin_id = admin[0].id;
      console.log(admin_id)
      accessToken = jwt.sign({ auth_id, name, email, role, admin_id }, process.env.ACCESS_TOKEN_SECRET);
    } else {
      console.log('user memek')
      const user = await models.user.findAll({
        where: {
          auth_id: auth[0].id
        }
      });
      const auth_id = auth[0].id;
      const name = auth[0].name;
      const email = auth[0].email;
      const role = auth[0].role;
      const user_id = user[0].id;
      console.log(user_id)
      accessToken = jwt.sign({ auth_id, name, email, role, user_id }, process.env.ACCESS_TOKEN_SECRET);
    }
    res.status(200).json({ accessToken });
    res.end();
  } catch (error) {
    res.status(500).json({ msg: error.massage })
  }
}

module.exports = { Register, login };