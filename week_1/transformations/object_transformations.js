function fullName(person) {
  if (typeof person !== "object") return "Invalid input value";

  if (!person.firstName || !person.lastName) return "All fields are required";

  return `${person.firstName} ${person.lastName}`;
}

function isAdult(person) {
  if (typeof person !== "object") return "Invalid input value";

  if (!person.age) return "Age field must be provided";

  return person.age >= 18;
}

function filterByAge(people, minAge = 18) {
  if (!Array.isArray(people) || typeof minAge !== "number")
    return "Invalid data provided";

  if (minAge <= 0) return "Age must be greater than zero";

  if (people.length === 0) return "People array cannot be empty";

  const invalidAge = people.find((person) => typeof person.age !== "number");

  if (invalidAge) return "Age must be a number";

  return people.filter((person) => person.age >= minAge);
}
