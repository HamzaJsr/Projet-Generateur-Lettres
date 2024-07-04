import fetch from "node-fetch";
const API_KEY = process.env.API_KEY;
export default (server) => {
  server.post("/api/messageOperator", async (req, res) => {
    try {
      const {
        typeOfLettre,
        name,
        lastname,
        adresse,
        postalCode,
        commune,
        operator,
        dateOfContract,
        phoneNumber,
        contractNumber,
        dateOfLettreResi,
        faitAResi,
      } = req.body;
      const messageServer = `Ecris moi une ${typeOfLettre} avec mes informations personelle : 
      mon prenom c'est ${name}, 
      mon nom de famille c'est ${lastname}, 
      mon adresse c'est ${adresse} et code postal c'est : ${postalCode},
      la commune est : ${commune}, et voici les information sur mon operateur telephonique:
      Nom de l'operateur telephonique c'est ${operator}, mon contrat date du ${dateOfContract},
      mon numero de telephone est le ${phoneNumber}, mon numero de contrat est le ${contractNumber}, 
      la date de cette lettre de resiliation d'operateur telephonique est le ${dateOfLettreResi},
      et elle est faite à ${faitAResi}. Et remplis tout les champs aucun ne doit etre vide et ne fais pas de commentaire dans la lettre`;

      // res.json({ messageServer });
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
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: messageServer,
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
      res.json(data.choices[0].message.content);
    } catch (error) {
      console.error("Erreur lors du traitement de la requête", error);
      res
        .status(500)
        .json({ message: "Une erreur s'est produite côté serveur" });
    }
  });
};
