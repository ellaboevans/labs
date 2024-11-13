import { BattleSimulator } from "./battleSimulator.js";

const superhero = {
  name: "Superman",
  secretIdentity: "Clark Kent",
  powers: [
    "Superhuman strength",
    "Invulnerability to radiation",
    "Flight",
    "Superhuman agility",
    "Superhuman intelligence",
    "Superhuman speed",
    "Superhuman durability",
    "Superhuman endurance",
    "Superhuman strength",
  ],
  weakness: "Kryptonite",

  usePower(powerName) {
    if (this["powers"].includes(powerName))
      console.log(`${this.name} is using ${powerName}`);
    else console.log(`${this.name} does have ${powerName} power`);
  },

  revealIdentity() {
    console.log(`${this.name}'s secret identity is ${this.secretIdentity}\n`);
  },
};

superhero.usePower("Flight");
superhero.revealIdentity();

// Object constructor
function Superhero(name, secretIdentity, powers, weakness) {
  this.name = name;
  this.secretIdentity = secretIdentity;
  this.powers = powers;
  this.weakness = weakness;
}

Superhero.prototype.usePower = function (powerName) {
  if (this["powers"].includes(powerName))
    console.log(`${this.name} is using ${powerName}`);
  else console.log(`${this.name} does have ${powerName} power`);
};

Superhero.prototype.revealIdentity = function () {
  console.log(`${this.name}'s secret identity is ${this.secretIdentity}\n`);
};

const batman = new Superhero(
  "Batman",
  "Bruce Wayne",
  ["Intelligence", "Agility", "Speed", "Durability"],
  "Joker"
);

batman.usePower("Agility");
batman.revealIdentity();

// Iterations and transformations
const superheroes = [
  batman,
  new Superhero(
    "Spiderman",
    "Peter Parker",
    ["Spider-sense", "Strength", "Speed", "Durability"],
    "Venom"
  ),
  new Superhero(
    "Wonder Woman",
    "Natalie Portman",
    ["Superhuman strength", "Speed", "Durability", "Agility"],
    "Dynamo"
  ),
];

// using forEach to reveal their identities
superheroes.forEach((hero) => hero.revealIdentity());

// using map to create a new array with all superheroes' powers
const allHeroPowers = superheroes.map((hero) => hero.powers);
console.log("All hero powers:", allHeroPowers);

// using filter to find superheroes with superhuman powers
const filteredHero = superheroes.filter((hero) =>
  hero["powers"].includes("Agility")
);
console.log("filtered hero powers:", filteredHero);

// Battle Simulation
const hero1Select = document.getElementById("hero1");
const hero2Select = document.getElementById("hero2");
const results = document.getElementById("battle-results");
const button = document.getElementById("battle-btn");

// Populate hero selection dropdowns
superheroes.forEach((hero) => {
  const option = document.createElement("option");
  option.text = hero.name;
  hero1Select.add(option);
  hero2Select.add(option.cloneNode(true));
});

// event listener to the button to start the battle
button.addEventListener("click", () => {
  const hero1 = superheroes.find((hero) => hero.name === hero1Select.value);
  const hero2 = superheroes.find((hero) => hero.name === hero2Select.value);

  BattleSimulator.battle(hero1, hero2, results);
});
