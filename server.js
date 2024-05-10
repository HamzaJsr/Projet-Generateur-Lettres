import express from "express";
import fetch from "node-fetch";

const server = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Définir le répertoire des fichiers statiques
server.use(express.static("public")).use(express.json());

server.get("/", (req, res) => {
  res.end("Hello Mister");
});

// Fetch sur l'api openai
server.post("/api/data", async (req, res) => {
  try {
    const messageChat = req.body.message;
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      //Ce deuxième argument accepte un objet. fetch(url,{object})
      //Nous devons renseigner trois propriétés 1°method 2° headers 3° body dans cet objet pour configurer les trois nouvelles informations.
      {
        method: "POST", // method: "Sting"
        //headers: {Object JSON format}
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        //body: JSON Format et pour une requette ChatGPT il faut la propriete message qui contient un tableau contenant un objet avec role et content {"message": []}
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: messageChat,
            },
          ],
          temperature: 1.0,
          n: 1,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 0,
        }),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'API", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des données de l'API" });
  }
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});
