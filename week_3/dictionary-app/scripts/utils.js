const antonymsHeading = document.querySelector("#antonyms--heading");
const synonymsHeading = document.querySelector("#synonyms--heading");
const synonymsList = document.getElementById("synonyms__list");
const antonymsList = document.getElementById("antonyms__list");
const link = document.getElementById("link__text");

export function displaySynonyms(meanings) {
  synonymsList.innerHTML = "";
  const synonyms = meanings.flatMap((meaning) => meaning.synonyms);

  if (synonyms.length > 0) {
    synonymsHeading.style.display = "inline-block";
    synonyms.forEach((synonym) => {
      const synonymItem = document.createElement("li");
      synonymItem.textContent = synonym;
      synonymsList.appendChild(synonymItem);
    });
  } else {
    synonymsHeading.style.display = "none";
  }
}

export function displayAntonyms(meanings) {
  antonymsList.innerHTML = "";
  const antonyms = meanings.flatMap((meaning) => meaning.antonyms);

  if (antonyms.length > 0) {
    antonymsHeading.style.display = "inline-block";
    antonyms.forEach((antonym) => {
      const antonymItem = document.createElement("li");
      antonymItem.textContent = antonym;
      antonymsList.appendChild(antonymItem);
    });
  } else {
    antonymsHeading.style.display = "none";
  }
}

// Display source URLs
export function displaySourceUrls(sourceUrls) {
  sourceUrls.forEach((source) => {
    link.href = source;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = source;
  });
}

// Enable user to interact with enter key
export function enterSearch(event, searchInput, fn) {
  if (event.key === "Enter" && searchInput.value.trim()) {
    fn(searchInput.value);
  }
}
