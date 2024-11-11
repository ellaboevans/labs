// TODO: Remove console.log functions and function calls after final review
function fullName(person) {
  if (typeof person !== "object") return "Invalid input value";

  if (!person.firstName || !person.lastName) return "All fields are required";

  return `${person.firstName} ${person.lastName}`;
}

const person = { firstName: "Evans", lastName: "Elabo" };
console.log("Full name", fullName(person));

function isAdult(person) {
  if (typeof person !== "object") return "Invalid input value";

  if (!person.age) return "Age field must be provided";

  return person.age >= 18;
}

const person2 = { age: 17 };
console.log("isAdult", isAdult(person2));

function filterByAge(people, minAge = 18) {
  if (!Array.isArray(people) || typeof minAge !== "number")
    return "Invalid data provided";

  if (minAge <= 0) return "Age must be greater than zero";

  if (people.length === 0) return "People array cannot be empty";

  const invalidAge = people.find((person) => typeof person.age !== "number");

  if (invalidAge) return "Age must be a number";

  return people.filter((person) => person.age >= minAge);
}

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

console.log("Filter", filterByAge(people, 17));
