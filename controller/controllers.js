const {Masyarakat, Pengaduan, Tanggapan, Petugas} = require("../models/index")
const bcryptjs = require("bcrypt")

exports.login = async (req,res) => {
  try {
    const payload = req.body
    const userdata = await Masyarakat.findOne({where : {username: payload.username}})
    if(userdata){
      const hashcheck = bcryptjs.compareSync(payload.password, userdata.password)
      if (!hashcheck) return res.status(400).send("Password Salah")
      return res.status(200).send(userdata)
    }
    else return res.status(404).send("Akun tidak ditemukan")
  } catch (error) {
    console.error(error)
  }
}

// Controller Masyarakat
exports.getMasyarakat = async (req, res) => {
  try {
    const response = await Masyarakat.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getMasyarakatById = async (req, res) => {
  try {
    const response = await Masyarakat.findOne({
      where: { nik: req.params.nik },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.postMasyarakat = async (req, res) => {
  try {
    const payload = req.body
    const hashed = bcryptjs.hashSync(payload.password, 12)
    payload["password"] = hashed
    const request = await Masyarakat.create(payload);
    res.status(200).json({ msg: "Data berhasil dikirim", request });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateMasyarakat = async (req, res) => {
  try {
    const findData = await Masyarakat.findOne({ where : { nik: req.params.nik}})
    if (!findData) return res.status(404).json({msg: 'Data tidak ditemukan'})
    const request = Masyarakat.update(
      {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        telp: req.body.telp,
      },
      { where: { nik: req.params.nik } }
    );
    res.status(200).json({ msg: `Data ${findData.nama} berhasil diupdate` });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteMasyarakat = async (req, res) => {
  try {
    const request = await Masyarakat.destroy({
      where: { nik: req.params.nik },
    });
    if(request) return res.status(200).json({ msg: "Data berhasil dihapus" });
    return res.status(404).send({msg: "Data tidak ditemukan"}) 
  } catch (error) {
    console.log(error.message);
  }
};

// Controller Petugas
exports.getPetugas = async (req, res) => {
  try {
    const response = await Petugas.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getPetugasById = async (req, res) => {
  try {
    const response = await Petugas.findOne({
      where: { id_petugas: req.params.id },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

exports.postPetugas = async (req, res) => {
  try {
    const payload = req.body
    const hashed = bcryptjs.hashSync(payload.password, 12)
    payload["password"] = hashed
    const request = await Petugas.create(payload);
    res.status(200).json({ msg: "Data berhasil dikirim", request });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updatePetugas = async (req, res) => {
  try {
    const findData = await Petugas.findOne({ where : { id_petugas: req.params.id}})
    if (!findData) return res.status(404).json({msg: 'Data tidak ditemukan'})
    const request = Petugas.update(
      {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        telp: req.body.telp,
        level: req.body.level,
      },
      { where: { id_petugas: req.params.id } }
    );
    res.status(200).json({ msg: `Data ${req.params.id} berhasil diupdate` });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deletePetugas = async (req, res) => {
  try {
    const request = Petugas.destroy({ where: { id_petugas: req.params.id } });
    if(request) return res.status(200).json({ msg: "Data berhasil dihapus" });
    return res.status(404).send({msg: "Data tidak ditemukan"}) 
  } catch (error) {
    console.log(error.message);
  }
};
