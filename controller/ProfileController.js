const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const { Op } = require("sequelize")

const getProfile = async (req, res) => {
  try {
    const { admin_id, user_id, role, name, email } = req.decoded;

    // Check Role
    if (role == 'admin') {
      const response = await models.admin.findAll({
        where: {
          id: admin_id
        }
      });
      let array = [];
      for (const x of response) {
        let obj = {
          id: x.id,
          gender: x.gender,
          status: x.status,
          name: name,
          email: email,
        }
        array.push(obj);
      }
      res.status(200).json(array);
      res.end();
    } else {
      const response = await models.user.findAll({
        where: user_id
      });
      let array = [];
      for (const x of response) {
        let obj = {
          id: x.id,
          gender: x.gender,
          name: name,
          email: email,
        }
        array.push(obj);
      }
      res.status(200).json(array);
      res.end();
    }

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
const updateProfile = async (req, res) => {
  try {
    const { admin_id, user_id, role,auth_id } = req.decoded;
    const { name, email, gender, status } = req.body;

    if (role === 'admin') {
      await models.auth.update(
        { name, email, gender, status },
        { where: { id: auth_id } }
      );
      res.status(200).json({ msg: 'Profile updated successfully' });
    } else {
      await models.auth.update(
        { name, email, gender },
        { where: { id: auth_id } }
      );
      res.status(200).json({ msg: 'Profile updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const admin = await models.admin.findOne({
      where: {
        id: req.query.id
      }
    });
    if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });

    const salt = await bcrypt.genSalt(10);
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    await models.auth.update({ password: hashedPassword }, {
      where: {
        id: admin.auth_id
      }
    });

    res.status(200).json({ msg: "Admin Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// const getProfile = async (req, res) => {
//   try {
//     // Dapatkan informasi pengguna dari token yang terdekripsi
//     const { id, role } = req.decoded;

//     let response;

//     // Periksa peran pengguna untuk mendapatkan data profil yang sesuai
//     if (role === 'admin') {
//       const response = await models.admin.findAll({
//         where: {
//           id: id
//         },
//         include: [
//           {
//             model: models.auth,
//             as: 'auth',
//           },
//           {
//             model: models.division,
//             as: 'division',
//           }
//         ],
//       });
//     } else {
//       response = await models.user.findAll();
//     }

//     if (!response) {
//       return res.status(404).json({ msg: 'Profil tidak ditemukan' });
//     }
//     let array = [];
//     for (const x of response) {
//       let obj = {
//         id: x.id,
//         gender: x.gender,
//         sttus: x.status,
//         name: x.auth.name,
//         auth_id: x.auth.id,
//         email: x.auth.email,
//         division_id: x.division.id,
//         division: x.division.name
//       }
//       array.push(obj);
//     }
//     // Kirim data profil sebagai respons
//     res.status(200).json(array);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// }

module.exports = { getProfile, updateProfile };