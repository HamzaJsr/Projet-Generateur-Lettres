const API_KEY = process.env.API_KEY;
const form = document.getElementById("form");
//blocInfoMinimumDiv
const blocInfoMinimumDiv = document.getElementById("blocInfoMinimum");
const select = document.getElementById("lettre");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const adresse = document.getElementById("adresse");
const postalCode = document.getElementById("postalCode");
const commune = document.getElementById("commune");
//Fin blocInfoMinimumDiv

//blocDemission
const blocDemissionDiv = document.getElementById("blocDemission");
const employeurName = document.getElementById("employeurName");
const adresseWork = document.getElementById("adresseWork");
const postalCodeWork = document.getElementById("postalCodeWork");
const communeWork = document.getElementById("communeWork");
const occupedWork = document.getElementById("occupedWork");
const dateStartWork = document.getElementById("dateStartWork");
const preavisTime = document.getElementById("preavisTime");
const dateOfLettre = document.getElementById("dateOfLettre");
const faitA = document.getElementById("faitA");
// Fin blocDemission
///////////////////////////
// blocResiliation
const blocResiliation = document.getElementById("blocResiliation");
const operator = document.getElementById("operator");
const dateOfContract = document.getElementById("dateOfContract");
const phoneNumber = document.getElementById("phoneNumber");
const contractNumber = document.getElementById("contractNumber");
const dateOfLettreResi = document.getElementById("dateOfLettreResi");
const faitAResi = document.getElementById("faitAResi");
// Fin blocResiliation
//////////////////////////
// Test Div Content pour tester l'affichage du resultat dans une div
const testDivContent = document.getElementById("testDivContent");
const loader = document.querySelector(".loader");
// Tentative de boucle sur les inputs pour gerer la validation comme quoi tout les inputs sont remplis
const inputsMinimumArray = document.querySelectorAll(
  "div.blocInfoMinimum input"
);
const inputsDemissionArray = document.querySelectorAll(
  "div.blocDemission input"
);
const inputsResiliationArray = document.querySelectorAll(
  "div.blocResiliation input"
);

console.log(inputsMinimumArray);
console.log(inputsDemissionArray);
console.log(inputsResiliationArray);

function validateForm(inputsMinimumArray, secondInputsArray) {
  let totalArray = Array.from(inputsMinimumArray).concat(
    Array.from(secondInputsArray)
  );
  let valideInput = 0;
  console.log(totalArray);
  console.log(totalArray.length);
  for (let i = 0; i < totalArray.length; i++) {
    console.log(totalArray[i].value);
    if (totalArray[i].value != "") {
      valideInput += 1;
      console.log(valideInput);
    }
  }
  console.log(valideInput);
  if (valideInput === totalArray.length) {
    return true;
  } else {
    return false;
  }
}
validateForm(inputsMinimumArray, inputsDemissionArray);

// Partie ou on determine quel bloc vas apparaitre pour finir  de remplir le formulaire
blocInfoMinimumDiv.addEventListener("change", () => {
  if (
    name.value &&
    lastname.value &&
    adresse.value &&
    postalCode.value &&
    commune.value
  ) {
    if (select.value === "1") {
      blocResiliation.style.display = "none";
      blocDemissionDiv.style.display = "block";
    } else if (select.value === "2") {
      blocDemissionDiv.style.display = "none";
      blocResiliation.style.display = "block";
    }
  }
});
//Fin du bloc precedent

// Addevent listener sur le formulaire
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let message;
  const lettreSelectValue = select.value;
  let typeOfLettre = "";
  let secondInputsArray;
  //blocInfoMinimumDiv
  const nameValue = name.value.trim();
  const adresseValue = adresse.value.trim();
  const lastnameValue = lastname.value.trim();
  const postalCodeValue = postalCode.value.trim();
  const communeValue = commune.value;
  //blocDemission
  const employeurNameValue = employeurName.value;
  const adresseWorkValue = adresseWork.value;
  const postalCodeWorkValue = postalCodeWork.value;
  const communeWorkValue = communeWork.value;
  const occupedWorkValue = occupedWork.value;
  const dateStartWorkValue = dateStartWork.value;
  const preavisTimeValue = preavisTime.value;
  const dateOfLettreValue = dateOfLettre.value;
  const faitAValue = faitA.value;
  // blocResiliation
  const operatorValue = operator.value;
  const dateOfContractValue = dateOfContract.value;
  const phoneNumberValue = phoneNumber.value;
  const contractNumberValue = contractNumber.value;
  const dateOfLettreResiValue = dateOfLettreResi.value;
  const faitAResiValue = faitAResi.value;

  if (lettreSelectValue === "1") {
    secondInputsArray = inputsDemissionArray;
    typeOfLettre = "lettre de démission";
    message = `Ecris moi une ${typeOfLettre} avec mes informations personelle : 
    mon prenom c'est ${nameValue}, 
    mon nom de famille c'est ${lastnameValue}, 
    mon adresse c'est ${adresseValue} et code postal c'est : ${postalCodeValue},
    la commune est : ${communeValue},
    la societé où je travail s'appelle : ${employeurNameValue},
    elle est situé a l'adresse suivante: ${adresseWorkValue},
    le code postale c'est ${postalCodeWorkValue},
    la commune de la societe est ${communeWorkValue},
    dans cette societé j'occupe le poste de ${occupedWorkValue},
    j'ai commencé dans cette societé a la date du ${dateStartWorkValue},
    la periode de preavis est de ${preavisTimeValue},
    la date de cette lettre de demission est du ${dateOfLettreValue},
    elle est faite à ${faitAValue}`;
  } else if (lettreSelectValue === "2") {
    secondInputsArray = inputsResiliationArray;
    typeOfLettre = "lettre de résiliation d'operateur telephonique";
    message = `Ecris moi une ${typeOfLettre} avec mes informations personelle : 
  mon prenom c'est ${nameValue}, 
  mon nom de famille c'est ${lastnameValue}, 
  mon adresse c'est ${adresseValue} et code postal c'est : ${postalCodeValue},
  la commune est : ${communeValue}, et voici les information sur mon operateur telephonique:
  Nom de l'operateur telephonique c'est ${operatorValue}, mon contrat date du ${dateOfContractValue},
  mon numero de telephone est le ${phoneNumberValue}, mon numero de contrat est le ${contractNumberValue}, 
  la date de cette lettre de resiliation d'operateur telephonique est le ${dateOfLettreResiValue},
  et elle est faite à ${faitAResiValue} `;
  }

  console.log(message);

  if (validateForm(inputsMinimumArray, secondInputsArray)) {
    try {
      loader.style.display = "block";
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
                content: message,
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
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        loader.style.display = "none";
        console.log(data);
        console.log(data.choices[0].message.content);
        testDivContent.innerText = data.choices[0].message.content;
      } else {
        testDivContent.innerText = "Une erreur c'est produite";
      }
    } catch (error) {
      console.error("Probleme rencontrer");
      testDivContent.innerText = "Une erreur c'est produite";
    }
  }
});
