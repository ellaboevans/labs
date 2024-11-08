function fullName(person) {
  if (typeof person !== "object") {
    return { error: "Invalid input value" };
  }

  if (!person.firstName || !person.lastName) {
    return { error: "Invalid object strcture" };
  }
  return `${person.firstName} ${person.lastName}`;
}

const person = { firstName: "Evans", lastName: "Elabo" };
console.log("Full name", fullName(person));

function isAdult(person) {
  if (typeof person !== "object") {
    return { error: " Invalid input value" };
  }

  if (!person.age) {
    return { error: "Invalid object strcture" };
  }
  return person.age >= 18;
}

const person2 = { age: 17 };
console.log("isAdult", isAdult(person2));

function filterByAge(people, minAge = 18) {
  if (!Array.isArray(people) || typeof minAge !== "number") {
    return { error: "Invalid input data" };
  }

  if (minAge <= 0) {
    return { error: "Invalid minimum age" };
  }

  if (people.length === 0) {
    return [];
  }

  return people.filter((person) => {
    if (typeof person.age !== "number") {
      return { error: "Invalid person object" };
    }

    return person.age >= minAge;
  });
}

const people = [
  {
    firstName: "Evans",
    lastName: "Elabo",
    age: "18",
  },
  {
    firstName: "David",
    lastName: "Elabo",
    age: "20",
  },
];

console.log("Filter", filterByAge(people));
