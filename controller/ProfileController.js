const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const { Op } = require("sequelize")

const getProfile = async (req, res) => {
  try {
    const { admin_id, user_id, role } = req.decoded;

    // Check Role
    if (role == 'admin') {
      const response = await models.admin.findAll({
        where: {
          id: admin_id
        }
      });
      res.status(200).json(response);
      res.end();
    } else {
      const response = await models.user.findAll({
        where: user_id
      });
      res.status(200).json(response);
      res.end();
    }

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { admin_id, user_id, role } = req.decoded;
    const { name, email } = req.body; // Mengambil nilai name dan email dari req.body
    const body = {
      name: name,
      email: email,
    };
    if (role == 'admin') {
      await models.auth.update(body, {
        where: {
          id: admin_id
        }
      });
      res.status(200).json({ msg: "Admin Updated" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
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