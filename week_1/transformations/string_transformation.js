function capitalize(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }
  return str.charAt(0).toUpperCase().concat(str.slice(1));
}

capitalize("amalitech Ghana");

function reverse(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }
  return str.split("").reverse().join("");
}

reverse("hello");

function isPalindrome(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }
  let result =
    str.toLowerCase().split("").reverse().join("") === str.toLowerCase();

  return result;
}

isPalindrome("racecar");

function wordCount(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }

  let result = str.trim().split(" ").length;
  return result;
}

wordCount("My name is Evans");
