function double(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  const filteredNum = arr.filter((el) => {
    if (typeof el === "number") {
      return el;
    }
  });
  return filteredNum.map((num) => {
    return num * 2;
  });
}

console.log("Double", double([1, 2, 3, "hello world"]));

function filterEven(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  return arr.filter((element) => {
    if (typeof element === "number" && element % 2 === 0) {
      return element;
    }
  });
}

console.log("Filter", filterEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

function sum(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  return arr.reduce((acc, curr) => {
    if (typeof curr === "number") {
      return acc + curr;
    }
    return acc;
  }, 0);
}

console.log("Sum", sum([1, 2, 3, 4, 5]));

function average(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  let sum = arr.reduce((acc, curr) => {
    if (typeof curr === "number") {
      return acc + curr;
    }
    return acc;
  }, 0);

  let avg = sum / arr.length;
  return avg;
}
console.log("Average", average([1, 2, 3, 4, 5, 6]));
