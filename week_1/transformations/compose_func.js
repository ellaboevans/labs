/*
 * The compose function takes multiple functions as its arguments.
 * It returns a new function that processes an initial input value through the provided functions
 * from right to left.
 *
 * When the returned function is called with an input value, it applies each function in the reverse order
 * of their composition. If any function in the chain returns an object with an `error` property,
 * the composition stops and returns that object immediately.
 */

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

// Testing with other created functions
function double(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  return arr.map((element) => element * 2);
}

function filterEven(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  return arr.filter((element) => element % 2 === 0);
}

const doubleEven = compose(double, filterEven);
console.log(doubleEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
