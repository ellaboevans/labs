// import module
import { PasswordGenerator } from "./passwordGenerator.js";

// Element References
const passwordDisplay = document.getElementById("result");
const strengthIndicator = document.getElementById("strength-indicator");
const generateButton = document.getElementById("generate__button");
const copyButton = document.getElementById("copy-btn");
const slider = document.getElementById("slider");
const countDisplay = document.getElementById("count");
const upperCase = document.getElementById("uppercase");
const lowerCase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Instance of PasswordGenerator
const passwordGenerator = new PasswordGenerator();

// Event Listeners
generateButton.addEventListener("click", handlePasswordGenerate);
slider.addEventListener("input", handleCountDisplay);
slider.addEventListener("input", updateSliderBackground);
copyButton.addEventListener("click", handlePasswordCopy);

slider.addEventListener("input", updateButtonState);
checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", updateButtonState)
);

// Functions
function handlePasswordGenerate() {
  passwordGenerator.length = slider.value;
  passwordGenerator.includeUppercase = upperCase.checked;
  passwordGenerator.includeLowercase = lowerCase.checked;
  passwordGenerator.includeNumbers = numbers.checked;
  passwordGenerator.includeSymbols = symbols.checked;

  const password = passwordGenerator.generatePassword();
  passwordDisplay.textContent = password;
  passwordDisplay.style.color = "#e6e5ea";

  const strength = passwordGenerator.calculateStrength(password);

  // Select all strength indicator divs
  const strengthBars = document.querySelectorAll(
    ".password-strength__indicator div"
  );

  strengthBars.forEach((bar) => {
    bar.classList.remove("too-weak", "weak", "medium", "strong");
  });

  // Apply classes based on strength
  if (strength === "TOO WEAK!") {
    strengthBars[0].classList.add("too-weak");
  } else if (strength === "WEAK") {
    strengthBars[0].classList.add("weak");
    strengthBars[1].classList.add("weak");
  } else if (strength === "MEDIUM") {
    strengthBars[0].classList.add("medium");
    strengthBars[1].classList.add("medium");
    strengthBars[2].classList.add("medium");
  } else if (strength === "STRONG") {
    strengthBars.forEach((bar) => bar.classList.add("strong"));
  }

  strengthIndicator.textContent = strength;
}

function updateSliderBackground() {
  const max = slider.max;
  const value = slider.value;
  const percentage = (value / max) * 100;

  countDisplay.textContent = slider.value;

  passwordDisplay.textContent = "P4$5W0rD!";
  passwordDisplay.style.color = "#817d92";

  slider.style.background = `linear-gradient(to right, #a4ffaf ${percentage}%, #1a1a1a ${percentage}%)`;
}

function handlePasswordCopy() {
  navigator.clipboard.writeText(passwordDisplay.textContent);
  copyButton.textContent = "COPIED";

  setTimeout(() => {
    copyButton.textContent = "";
    let img = document.createElement("img");
    img.src = "./assets/images/icon-copy.svg";
    img.alt = "icon-copy";
    copyButton.appendChild(img);
  }, 2000);
}

function updateButtonState() {
  const sliderValue = parseInt(slider.value);
  const isAnyCheckboxChecked = Array.from(checkboxes).some(
    (checkbox) => checkbox.checked
  );

  generateButton.disabled = !(sliderValue > 0 && isAnyCheckboxChecked);
}

function handleCountDisplay() {
  countDisplay.textContent = slider.value;
}

// Initial loading state
updateButtonState();

handlePasswordGenerate();

updateSliderBackground();
