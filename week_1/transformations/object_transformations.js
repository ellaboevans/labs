function fullName(person) {
  if (typeof person !== "object") {
    return { error: "Invalid input value" };
  }
  return `${person.firstName} ${person.lastName}`;
}

const person = { firstName: "Evans", lastName: "Elabo" };
fullName(person);

function isAdult(person) {
  if (typeof person !== "object") {
    return { error: "Invalid input value" };
  }
  return person.age >= 18;
}

const person2 = { age: 17 };
isAdult(person2);

function filterByAge(people, minAge) {
  if (!Array.isArray(people) && typeof minAge !== "number") {
    return { error: "Invalid input values" };
  }

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

filterByAge(people, 18);
