// Select HTML element
const toggleMenu = document.getElementById("toggle__menu");

// Handle theme change
function handleThemeChange() {
  const isDarkTheme = toggleMenu.checked;
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  document.body.classList.toggle("dark-theme", isDarkTheme);
}

// Event listener for theme toggle
toggleMenu.addEventListener("change", handleThemeChange);

// Set initial theme based on local storage
if (localStorage.getItem("theme") === "dark") {
  toggleMenu.checked = true;
  document.body.classList.add("dark-theme");
}
