const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("db_log2", "root", "senai", {
  host: "localhost",
  dialect: "mysql",
});

// sequelize.authenticate()
// .then(()=>{
//     console.log('Funcionando')
// })
// .catch((err)=>{
//     console.log('Não está funcionando', err)
// })

module.exports = sequelize;
