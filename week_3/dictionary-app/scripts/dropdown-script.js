// Element references
const dropdown = document.querySelector(".dropdown");
const selected = document.querySelector(".dropdown__selected span");
const options = document.querySelectorAll(".dropdown__option");
const dropdownMenu = document.querySelector(".dropdown__menu");
const inputField = document.querySelector("#search__bar__input");
const contentContainer = document.body;

// Toggle dropdown menu on click
dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("dropdown__active");
  dropdownMenu.classList.toggle("dropdown__active");
});

// Update selected option in dropdown
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    selected.textContent = e.target.textContent;
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target))
    dropdown.classList.remove("dropdown__active");
});

// Change font family for content container based on selected option
dropdownMenu.addEventListener("click", (event) => {
  contentContainer.classList.remove("sans__serif", "serif", "mono");

  const selectedFont = event.target.textContent.trim();
  if (selectedFont === "Sans Serif") {
    contentContainer.classList.add("sans__serif");
  } else if (selectedFont === "Serif") {
    contentContainer.classList.add("serif");
  } else if (selectedFont === "Mono") {
    contentContainer.classList.add("mono");
  }
});

// Function to change font for input field
function changeFont(fontFamily) {
  inputField.style.fontFamily = fontFamily;
  inputField.placeholder = inputField.placeholder;
}

// Update input field font based on selected option
options.forEach((option) => {
  option.addEventListener("click", () => {
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
