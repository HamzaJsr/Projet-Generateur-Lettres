import fetch from "node-fetch";
const API_KEY = process.env.API_KEY;

export default (server) => {
  server.post("/api/messageWork", async (req, res) => {
    try {
      const {
        typeOfLettre,
        name,
        lastname,
        adresse,
        postalCode,
        commune,
        employeurName,
        adresseWork,
        postalCodeWork,
        communeWork,
        occupedWork,
        dateStartWork,
        preavisTime,
        dateOfLettre,
        faitA,
      } = req.body;
      const messageServer = `Je demissione : Ecris moi une ${typeOfLettre} et voila mes informations personnelles pour l'écrire :
            Mon prénom est ${name},
            Mon nom de famille est ${lastname},
            Mon adresse est ${adresse} et mon code postal est : ${postalCode},
            La commune est : ${commune},
            La lettre est adressé à la société où je travaille et elle s'appelle : ${employeurName},
            Elle est située à l'adresse suivante: ${adresseWork},
            Le code postal est ${postalCodeWork},
            La commune de la société est ${communeWork},
            Dans cette société, j'occupe le poste de ${occupedWork},
            J'ai commencé dans cette société à la date du ${dateStartWork},
            La période de préavis est de ${preavisTime},
            La date de cette lettre est du ${dateOfLettre},
            Elle est faite à ${faitA}`;

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
      console.error(
        "Erreur lors de la récupération des données de l'API",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération des données de l'API",
      });
    }
  });
};
