/*
 * The capitalize function accepts a string as its argument.
 * It first verifies if the input provided by the user is indeed a string.
 * If the input is a valid string, the function proceeds with the operations
 * and returns the expected result.
 * If not, it halts the operation and returns an error message.
 */
function capitalize(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }
  return str.charAt(0).toUpperCase().concat(str.slice(1));
}

// Function call
capitalize("amalitech Ghana");

/*
 * The reverse function accepts a string as its argument.
 * It first verifies if the input provided by the user is indeed a string.
 * If the input is a valid string, the function proceeds to reverse the string
 * and returns the reversed value. If not, it halts the operation and returns an error message.
 */
function reverse(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }
  return str.split("").reverse().join("");
}

// Function call
reverse("hello");
/*
 * The isPalindrome function accepts a string as its argument.
 * It first verifies if the input provided by the user is indeed a string.
 * If the input is a valid string, the function converts it to lowercase,
 * then compares the original and reversed values to determine if they are the same.
 * It returns a boolean indicating whether the input is a palindrome.
 * If the input is not a valid string, the function halts the operation and returns an error message.
 */
function isPalindrome(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }
  let result =
    str.toLowerCase().split("").reverse().join("") === str.toLowerCase();

  return result;
}

// Function call
isPalindrome("racecar");

/*
 * The wordCount function takes a string as its argument.
 * It first checks if the input provided by the user is a valid string.
 * If the input is a valid string, the function splits the string into an array of words
 * using spaces as separators and returns the total number of words.
 * If the input is not a valid string, the function halts the operation and then returns an error message.
 */
function wordCount(str) {
  if (typeof str !== "string") {
    return { error: "Invalid input data" };
  }

  let result = str.trim().split(" ").length;
  return result;
}

// Function call
wordCount("My name is Evans");

function compose(...functions) {
  return function (inputValue) {
    return functions.reduceRight((acc, fn) => {
      if (acc && acc.error) {
        return acc;
      }
      return fn(acc);
    }, inputValue);
  };
}

const reverseAndCapitalize = compose(reverse, capitalize);
console.log(reverseAndCapitalize("racecar"));
