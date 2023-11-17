const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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
      console.log('admin')
      const admin = await models.admin.findAll({
        where: {
          auth_id: auth[0].id
        }
      });
      const auth_id = auth[0].id;
      const name = auth[0].name;
      const email = auth[0].email;
      const password = auth[0].password;
      const role = auth[0].role;
      const admin_id = admin[0].id;
      console.log(password)
      accessToken = jwt.sign({ auth_id, name, email, role, admin_id }, process.env.ACCESS_TOKEN_SECRET);
    } else {
      console.log('user')
      const user = await models.user.findAll({
        where: {
          auth_id: auth[0].id
        }
      });
      const auth_id = auth[0].id;
      const name = auth[0].name;
      const email = auth[0].email;
      const password = auth[0].password;
      const role = auth[0].role;
      const user_id = user[0].id;
      console.log(password)
      accessToken = jwt.sign({ auth_id, name, email, role, user_id,password }, process.env.ACCESS_TOKEN_SECRET);
    }
    res.status(200).json({ accessToken });
    res.end();
  } catch (error) {
    res.status(500).json({ msg: error.massage })
  }
}

const resetPassword = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.SERVICE_MAIL,
      host: process.env.HOST_MAIL,
      port: process.env.PORT_MAIL,
      secure: true,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      }
    });
    const { email } = req.body; // Mengambil nilai name dan email dari req.body
    if (email == null) return res.status(400).json({ msg: 'Email Kosong' });
    // Tambahkan kondisi untuk memeriksa apakah email terdaftar dalam autentikasi
    const user = await models.auth.findOne({ where: { email: email } });
    if (!user) return res.status(400).json({ msg: 'Email tidak terdaftar' });


    if (!`${email}`.includes('@')) return res.status(400).json({ msg: 'Invalid Email' });

    let password = 'HIMTIF#';
    const character = process.env.RANDOM_PASSWORD;
    const characterLength = character.length;
    let count = 0;
    while (count < 8) {
      password += character.charAt(Math.floor(Math.random() * characterLength));
      count += 1;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await models.auth.update(
      { password: hashedPassword },
      {
        where: {
          email: email
        }
      }
    );

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: email,
      subject: 'Reset Password',
      text: `Password baru Anda: ${password}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
module.exports = { Register, login, resetPassword };