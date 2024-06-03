const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const conn = require("./db/conn");
const Ususario = require("./model/Usuario");

const PORT = 3000;
const hostname = "localhost";
//================================================//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//================================================//
app.post('/logar', (req, res)=>{
    const login = req.body;
    console.log(login);

    bcrypt.compare(login.senha, hash, async (err, result)=>{
        if (err) {
            console.log("Erro ao verificar a criptografia");
            res.status(500).json({ message: "Erro ao verificar a criptografia" });
          }

        const pesq = await Ususario.findOne({where: {email: login.email}, raw: true})
        console.log(pesq)
        res.status(200).json(pesq)
    });




})

app.post("/cadastrar", (req, res) => {
  const cad = req.body;
  console.log(cad);

  bcrypt.hash(cad.senha, 10, async (err, hash) => {
    if (err) {
      console.log("Erro ao gerar o hash");
      res.status(500).json({ message: "erro ao criptografar a senha" });
    }

    try {
      const grav = await Ususario.create({
        nome: cad.nome,
        email: cad.email,
        senha: hash,
      });

      console.log(grav);

      res.status(200).json(grav);
    } catch (err) {
      console.error("Erro ao gravar os dados", err);
      res.status(200).json({ message: "Erro ao gravar os dados" });
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Aplicação rodando" });
});

//================================================//
conn
  .sync()
  .then(() => {
    app.listen(PORT, hostname, () => {
      console.log(`Servidor rodando em ${hostname}:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Erro de conexão", err);
  });

//================================================//
