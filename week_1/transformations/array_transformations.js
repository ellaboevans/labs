/*
 * The double function takes an array of numbers as its argument.
 * It checks if the input is a valid non-empty array. If not, it returns an empty array.
 * If the input is valid, it returns a new array where each element is doubled.
 */
function double(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  return arr.map((element) => element * 2);
}

// Function call
double([1, 2, 3]);

/*
 * The filterEven function takes an array of numbers as its argument.
 * It checks if the input is a valid non-empty array. If not, it returns an empty array.
 * If the input is valid, it returns a new array containing only the even numbers from the input array.
 */
function filterEven(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  return arr.filter((element) => element % 2 === 0);
}

// Function call
filterEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

/*
 * The sum function takes an array of numbers as its argument.
 * It checks if the input is a valid non-empty array. If not, it returns 0.
 * If the input is valid, it returns the sum of all the elements in the array.
 */
function sum(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  return arr.reduce((acc, curr) => acc + curr, 0);
}

// Function call
sum([1, 2, 3, 4, 5]);

/*
 * The average function takes an array of numbers as its argument.
 * It checks if the input is a valid non-empty array. If not, it returns 0.
 * If the input is valid, it calculates and returns the average of the elements in the array.
 */
function average(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  let sum = arr.reduce((acc, curr) => acc + curr, 0);
  let avg = sum / arr.length;
  return avg;
}
// Function call
average([1, 2, 3, 4, 5, 6]);
