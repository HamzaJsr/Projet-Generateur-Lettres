import express from "express";
import postMessageWork from "./src/routes/postMessageWork.js";
import postMessageOperator from "./src/routes/postMessageOperator.js";

const server = express();
const PORT = process.env.PORT || 3000;

// Définir le répertoire des fichiers statiques
server.use(express.static("public")).use(express.json());

server.get("/", (req, res) => {
  res.end("Hello Mister");
});

// EndPoints
postMessageWork(server);
postMessageOperator(server);

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});
