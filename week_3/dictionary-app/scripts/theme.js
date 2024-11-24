// Select HTML element
const toggleMenu = document.getElementById("toggle__menu");
const themeTooltip = document.getElementById("theme__tooltip");

// Handle theme change
function handleThemeChange() {
  const isDarkTheme = toggleMenu.checked;
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  document.body.classList.toggle("dark__theme", isDarkTheme);
  themeTooltip.textContent = isDarkTheme ? "Dark Mode" : "Light Mode";
}

// Initialize tooltip text based on the current state
themeTooltip.textContent = toggleMenu.checked ? "Dark Mode" : "Light Mode";

// Event listener for theme toggle
toggleMenu.addEventListener("change", handleThemeChange);

// Set initial theme based on local storage
if (localStorage.getItem("theme") === "dark") {
  toggleMenu.checked = true;
  document.body.classList.add("dark__theme");
  themeTooltip.textContent = "Dark Mode";
}
