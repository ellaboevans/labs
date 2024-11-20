// Select HTML elements
const searchInput = document.getElementById("search-bar__input");
const searchButton = document.getElementById("search__icon");
const wordElement = document.getElementById("searched__word");
const phoneticElement = document.getElementById("phonetic__structure");
const meaningsList = document.getElementById("meanings__list");
const playButton = document.querySelector("#play__button");

// import modules
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
    console.error(error.message);
    alert("Word not found, please try another search.");
  }
}

// Display data in the UI
function displayDefinition(data) {
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

  displaySynonyms(data.meanings);

  displayAntonyms(data.meanings);

  displaySourceUrls(data.sourceUrls);
}

// Event listener for search button click
searchButton.addEventListener("click", () => {
  const word = searchInput.value.trim();
  if (word) fetchDefinition(word);
});

document.addEventListener("keydown", (event) => {
  enterSearch(event, searchInput, fetchDefinition);
});

// Fetch initial word definition on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchDefinition();
});
