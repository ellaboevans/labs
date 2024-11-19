const toggleMenu = document.getElementById("toggle__menu");

function handleThemeChange() {
  localStorage.setItem("theme", toggleMenu.checked ? "dark" : "light");
  document.body.classList.toggle("dark-theme", toggleMenu.checked);
}

toggleMenu.addEventListener("change", handleThemeChange);

if (localStorage.getItem("theme") === "dark") {
  toggleMenu.checked = true;
  document.body.classList.add("dark-theme");
}
