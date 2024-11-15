function compose(...functions) {
  return function (inputValue) {
    return functions.reduceRight((acc, fn) => {
      if (typeof acc === "string") return acc;
      return fn(acc);
    }, inputValue);
  };
}

// Testing with other created functions
function double(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    return "Input should be a non-empty array.";

  const containsNaN = arr.find((el) => typeof el !== "number");

  if (containsNaN) return "Elements are all not a number.";

  return arr.map((num) => num * 2);
}

function filterEven(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    return "Input should be a non-empty array.";

  const containsNaN = arr.find((el) => typeof el !== "number");

  if (containsNaN) return "Elements are all not a number.";

  return arr.filter((element) => element % 2 === 0);
}
