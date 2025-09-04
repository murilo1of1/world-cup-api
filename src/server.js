const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const teamRoutes = require("./routes/teamRoutes");
const matchRoutes = require("./routes/matchRoutes");
const playerRoutes = require("./routes/playerRoutes");
const groupRoutes = require("./routes/groupRoutes");
const bingoRoutes = require("./routes/bingoRoutes");
const db = require("./config/database");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/teams", teamRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/bingo", bingoRoutes);

app.get("/", (req, res) => {
  res.send("API da Copa do Mundo está funcionando!");
});

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Erro ao fechar o banco de dados:", err.message);
    } else {
      console.log("Conexão com o banco de dados fechada.");
    }
    process.exit(0);
  });
});
