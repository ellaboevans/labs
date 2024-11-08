function capitalize(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }

  if (str.trim() === "") {
    return { error: "Input cannot be an empty string" };
  }
  return str.charAt(0).toUpperCase().concat(str.slice(1));
}

capitalize("amalitech Ghana");

function reverse(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }

  if (str.trim() === "") {
    return { error: "Input cannot be an empty string" };
  }
  return str.split("").reverse().join("");
}

console.log("Reverse", reverse("hello"));

function isPalindrome(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }

  if (str.trim() === "") {
    return { error: "Input cannot be an empty string" };
  }

  let result =
    str.toLowerCase().split("").reverse().join("") === str.toLowerCase();

  return result;
}

console.log("isPalindrome", isPalindrome("racecar"));

function wordCount(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }

  let result = str.trim().split(" ").length;
  return result;
}

console.log("wordCount", wordCount("My name is Evans"));
