import express from "express";
import { createServer } from "node:http";

const server = express();
const PORT = process.env.PORT || 3000;

// Définir le répertoire des fichiers statiques
server.use(express.static("public"));

server.get("/", (req, res) => {
  res.end("Hello Mister");
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});
