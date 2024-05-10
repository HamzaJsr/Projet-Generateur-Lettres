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
// blocResiliation
const blocResiliation = document.getElementById("blocResiliation");
const operator = document.getElementById("operator");
const dateOfContract = document.getElementById("dateOfContract");
const phoneNumber = document.getElementById("phoneNumber");
const contractNumber = document.getElementById("contractNumber");
const dateOfLettreResi = document.getElementById("dateOfLettreResi");
const faitAResi = document.getElementById("faitAResi");
// Fin blocResiliation
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

function validateForm(inputsMinimumArray, secondInputsArray) {
  let totalArray = [...inputsMinimumArray, ...secondInputsArray];
  let valideInput = 0;
  for (let i = 0; i < totalArray.length; i++) {
    if (totalArray[i].value != "") {
      valideInput += 1;
    }
  }
  if (valideInput === totalArray.length) {
    return true;
  } else {
    return false;
  }
}
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
  let reponseLettre;
  const lettreSelectValue = select.value;
  let typeOfLettre = "";
  let secondInputsArray;

  const formData = {
    mainInput: {
      typeOfLettre:
        lettreSelectValue === "1"
          ? "lettre de démission"
          : "lettre de résiliation d'operateur telephonique",
      name: name.value.trim(),
      lastname: lastname.value.trim(),
      adresse: adresse.value.trim(),
      postalCode: postalCode.value.trim(),
      commune: commune.value,
    },
    workInput: {
      employeurName: employeurName.value,
      adresseWork: adresseWork.value,
      postalCodeWork: postalCodeWork.value,
      communeWork: communeWork.value,
      occupedWork: occupedWork.value,
      dateStartWork: dateStartWork.value,
      preavisTime: preavisTime.value,
      dateOfLettre: dateOfLettre.value,
      faitA: faitA.value,
    },
    operatorInput: {
      operator: operator.value,
      dateOfContract: dateOfContract.value,
      phoneNumber: phoneNumber.value,
      contractNumber: contractNumber.value,
      dateOfLettreResi: dateOfLettreResi.value,
      faitAResi: faitAResi.value,
    },
  };
  if (lettreSelectValue === "1") {
    secondInputsArray = inputsDemissionArray;
    if (validateForm(inputsMinimumArray, secondInputsArray)) {
      const dataWork = {
        ...formData.mainInput,
        ...formData.workInput,
      };
      try {
        loader.style.display = "block";
        const response = await fetch("api/messageWork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataWork), // Convertir l'objet formData en JSON
        });
        if (response.ok) {
          loader.style.display = "none";
          const data = await response.json();
          testDivContent.innerText = data;
        } else {
          testDivContent.innerText = "Une erreur c'est produite";
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de l'envoi de la requête",
          error
        );
      }
    }
  } else if (lettreSelectValue === "2") {
    secondInputsArray = inputsResiliationArray;
    if (validateForm(inputsMinimumArray, secondInputsArray)) {
      const dataWork = {
        ...formData.mainInput,
        ...formData.operatorInput,
      };
      try {
        loader.style.display = "block";
        const response = await fetch("api/messageOperator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataWork), // Convertir l'objet formData en JSON
        });
        if (response.ok) {
          loader.style.display = "none";
          const data = await response.json();
          testDivContent.innerText = data;
        } else {
          testDivContent.innerText = "Une erreur c'est produite";
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de l'envoi de la requête",
          error
        );
      }
    }
  }
});
