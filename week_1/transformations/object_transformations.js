/**
 * The fullName function takes a person object as its argument.
 * It checks if the input is a valid object. If not, it returns an error message.
 * If the input is valid, it concatenates the firstName and lastName properties of the person object
 * and returns the full name as a string.
 */
function fullName(person) {
  if (typeof person !== "object") {
    return { error: "Invalid input value" };
  }
  return `${person.firstName} ${person.lastName}`;
}

// Dummy Data
const person = { firstName: "Evans", lastName: "Elabo" };
// Function call
fullName(person);

/*
 * The isAdult function takes a person object as its argument.
 * It checks if the input is a valid object. If not, it returns an error message.
 * If the input is valid, it checks if the age property of the person object is 18 or greater
 * and returns a boolean indicating whether the person is an adult.
 */
function isAdult(person) {
  if (typeof person !== "object") {
    return { error: "Invalid input value" };
  }
  return person.age >= 18;
}

// Dummy Data
const person2 = { age: 17 };
// Function call
isAdult(person2);

/**
 * The filterByAge function takes an array of people objects and a minimum age as its arguments.
 * It checks if the inputs are valid. If not, it returns an error message.
 * If the inputs are valid, it filters the array to include only those people whose age is greater than
 * or equal to the specified minimum age and returns the filtered array.
 */
function filterByAge(people, minAge) {
  if (!Array.isArray(people) && typeof minAge !== "number") {
    return { error: "Invalid input values" };
  }

  return people.filter((person) => person.age >= minAge);
}

// Dummy data
const people = [
  {
    firstName: "Evans",
    lastName: "Elabo",
    age: 18,
  },
  {
    firstName: "David",
    lastName: "Elabo",
    age: 20,
  },
];

// Function call
filterByAge(people, 18);
