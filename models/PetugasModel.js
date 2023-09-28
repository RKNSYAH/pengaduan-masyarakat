const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Petugas = db.define("petugas", {
  id_petugas: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  nama_petugas: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  telp: DataTypes.STRING,
  level: DataTypes.ENUM('admin', 'petugas'),
});

module.exports = Petugas;
