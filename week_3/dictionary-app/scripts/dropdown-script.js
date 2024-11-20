// Element references
const dropdown = document.querySelector(".dropdown");
const selected = document.querySelector(".dropdown__selected span");
const options = document.querySelectorAll(".dropdown__option");
const dropdownMenu = document.querySelector(".dropdown__menu");
const inputField = document.querySelector("#search-bar__input");
const selectedFont = document.querySelector(".dropdown__selected");

dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    selected.textContent = e.target.textContent;
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) dropdown.classList.remove("active");
});

// Get the body or main content container
const contentContainer = document.body;

// Listen for clicks on the dropdown options
dropdownMenu.addEventListener("click", (event) => {
  contentContainer.classList.remove("sans-serif", "serif", "mono");

  const selectedFont = event.target.textContent.trim();

  if (selectedFont === "Sans Serif") {
    contentContainer.classList.add("sans-serif");
  } else if (selectedFont === "Serif") {
    contentContainer.classList.add("serif");
  } else if (selectedFont === "Mono") {
    contentContainer.classList.add("mono");
  }
});

// Function to change font
function changeFont(fontFamily) {
  inputField.style.fontFamily = fontFamily;

  inputField.placeholder = inputField.placeholder;
}

options.forEach((option) => {
  option.addEventListener("click", function () {
    const selectedFontName = option.textContent.trim();

    if (selectedFontName === "Sans Serif") {
      changeFont("Inter, sans-serif");
    } else if (selectedFontName === "Serif") {
      changeFont("Lora, serif");
    } else if (selectedFontName === "Mono") {
      changeFont("Inconsolata, monospace");
    }
  });
});

dropdown.addEventListener("click", () => {
  dropdownMenu.classList.toggle("active");
});
