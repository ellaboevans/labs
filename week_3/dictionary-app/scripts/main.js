// Select HTML elements
const searchInput = document.getElementById("search-bar__input");
const searchButton = document.getElementById("search__icon");
const wordElement = document.getElementById("searched__word");
const phoneticElement = document.getElementById("phonetic__structure");
const meaningsList = document.getElementById("meanings__list");
const playButton = document.querySelector("#play__button");
const errorMessage = document.querySelector("#error__message");
const mainContainer = document.querySelector("#main__container");
const inputErrorMessage = document.querySelector("#input-error");

// Import modules
import "./dropdown-script.js";
import "./theme.js";
import {
  displayAntonyms,
  displaySourceUrls,
  displaySynonyms,
  enterSearch,
} from "./utils.js";

// Fetch dictionary data from API
async function fetchDefinition(word = "keyboard") {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();
    displayDefinition(data[0]);
  } catch (error) {
    displayErrorMessage();
  }
}

// Display error message
function displayErrorMessage() {
  errorMessage.style.display = "flex";
  mainContainer.style.display = "none";
}

// Display dictionary data in the UI
function displayDefinition(data) {
  errorMessage.style.display = "none";
  mainContainer.style.display = "block";

  // Display the searched word and its phonetic structure
  wordElement.textContent = data.word;
  phoneticElement.textContent = data.phonetics[0].text;

  // Set up audio pronunciation
  const audioData = data.phonetics.find((p) => p.audio);
  if (audioData) {
    playButton.onclick = () => new Audio(audioData.audio).play();
    playButton.style.display = "inline-block";
  } else {
    playButton.style.display = "none";
  }

  // Display meanings and word classes
  meaningsList.innerHTML = "";
  data.meanings.forEach((meaning) => {
    const meaningItem = document.createElement("div");
    meaningItem.classList.add("searched-word__category");

    // Display part of speech and meanings
    meaningItem.innerHTML = `
      <div class="class--heading">
        <h2 class="search-word__class">${meaning.partOfSpeech}</h2>
        <div class="border-line"></div>
      </div>
      <div id="meanings__container">
        <h3>Meaning</h3>
        <ul id="meanings__list">
          ${meaning.definitions
            .map(
              (def) => `
                <li class="meaning-list__item">
                  ${def.definition}
                  ${def.example ? `<p> "${def.example}"</p>` : ""}
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
    `;
    meaningsList.appendChild(meaningItem);
  });

  // Display synonyms, antonyms, and source URLs
  displaySynonyms(data.meanings);
  displayAntonyms(data.meanings);
  displaySourceUrls(data.sourceUrls);
}

// Handle input error
function inputError() {
  if (searchInput.value.length === 0) {
    searchInput.style.outline = "1px solid red";
    inputErrorMessage.style.visibility = "visible";
    mainContainer.style.display = "none";
    errorMessage.style.display = "none";
  }

  setTimeout(() => {
    searchInput.style.outline = "";
    inputErrorMessage.style.visibility = "hidden";
  }, 2000);
}

// Event listeners
searchButton.addEventListener("click", () => {
  const word = searchInput.value.trim();
  if (word) {
    fetchDefinition(word);
  }
  inputError();
});

document.addEventListener("keydown", (event) => {
  enterSearch(event, searchInput, fetchDefinition, inputError);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchDefinition();
});
