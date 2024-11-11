// TODO: Remove console.log functions and function calls after final review
function double(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    return "Input should be a non-empty array.";

  const containsNaN = arr.find((el) => typeof el !== "number");

  if (containsNaN) return "Elements are all not a number!";

  return arr.map((num) => num * 2);
}

console.log("Double", double([1, 2, 3, "hello"]));

function filterEven(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    return "Input should be a non-empty array.";

  const containsNaN = arr.find((el) => typeof el !== "number");

  if (containsNaN) return "Elements are all not a number.";

  return arr.filter((element) => element % 2 === 0);
}

console.log("Filter", filterEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

function sum(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    return "Input should be a non-empty array.";

  const containsNaN = arr.find((el) => typeof el !== "number");

  if (containsNaN) return "Elements are all not a number!";

  return arr.reduce((acc, curr) => acc + curr, 0);
}

console.log("Sum", sum([1, 2, 3, 4, 5]));

function average(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    return "Input should be a non-empty array.";

  const containsNaN = arr.find((el) => typeof el !== "number");

  if (containsNaN) return "Elements are all not a number!";

  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
}
console.log("Average", average([1, 2, 3, 4, 5, 6]));
