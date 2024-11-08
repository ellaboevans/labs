function double(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  return arr.map((element) => element * 2);
}

double([1, 2, 3]);

function filterEven(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  return arr.filter((element) => element % 2 === 0);
}

filterEven([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

function sum(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  return arr.reduce((acc, curr) => acc + curr, 0);
}

sum([1, 2, 3, 4, 5]);

function average(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  let sum = arr.reduce((acc, curr) => acc + curr, 0);
  let avg = sum / arr.length;
  return avg;
}
average([1, 2, 3, 4, 5, 6]);
