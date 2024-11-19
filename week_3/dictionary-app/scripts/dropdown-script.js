// Element references
const dropdown = document.querySelector(".dropdown");
const selected = document.querySelector(".dropdown__selected span");
const options = document.querySelectorAll(".dropdown__option");

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
