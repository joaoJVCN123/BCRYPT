const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Ususario = db.define(
  "usuarios",
  {
    nome: {
      type: DataTypes.STRING(45),
    },
    email: {
      type: DataTypes.STRING(60),
    },
    senha: {
      type: DataTypes.STRING(100),
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// Ususario.sync({force:true})

module.exports = Ususario;
