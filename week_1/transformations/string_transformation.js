function capitalize(str) {
  if (typeof str !== "string") return "Invalid input data";

  if (str.trim() === "") return "Input cannot be an empty string";

  return str.charAt(0).toUpperCase().concat(str.slice(1));
}

function reverse(str) {
  if (typeof str !== "string") return "Invalid input data";

  if (str.trim() === "") return "Input cannot be an empty string";

  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  if (typeof str !== "string") return "Invalid input data";

  if (str.trim() === "") return "Input cannot be an empty string";

  return str.toLowerCase().split("").reverse().join("") === str.toLowerCase();
}

function wordCount(str) {
  if (typeof str !== "string") return "Invalid input data";

  return str.trim().split(" ").length;
}
