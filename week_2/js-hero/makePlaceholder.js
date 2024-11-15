export function makePlaceholder(element, text) {
  const placholder = document.createElement("option");
  placholder.textContent = text;
  placholder.disabled = true;
  placholder.value = "";
  placholder.selected = true;
  element.append(placholder);
}
