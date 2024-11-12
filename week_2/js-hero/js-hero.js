const superhero = {
  name: "Superman",
  secretIdentiy: "Clark Kent",
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
    console.log(`${this.name} is using ${powerName}`);
  },

  revealIdentity() {
    console.log(`${this.name}'s secret identity is ${this.secretIdentiy}\n`);
  },
};

superhero.usePower("Flight");
superhero.revealIdentity();

// Object constructor
function Superhero(name, secretIdentiy, powers, weakness) {
  this.name = name;
  this.secretIdentiy = secretIdentiy;
  this.powers = powers;
  this.weakness = weakness;
}

Superhero.prototype.usePower = function (powerName) {
  console.log(`${this.name} is using ${powerName}`);
};

Superhero.prototype.revealIdentity = function () {
  console.log(`${this.name}'s secret identity is ${this.secretIdentiy}\n`);
};

const batman = new Superhero(
  "Batman",
  "Bruce Wayne",
  ["Intelligence", "Agility", "Speed", "Durability"],
  "Joker"
);

batman.usePower("Superhuman strength");
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

function battle() {
  const hero1 = superheroes.find((hero) => hero.name === hero1Select.value);
  const hero2 = superheroes.find((hero) => hero.name === hero2Select.value);

  if (hero1.name === hero2.name) {
   setTimeout(()=>{
     results.textContent =
       "Both heroes have the same name. No battle will occur.";

   },200)
    return;
  }
}

button.addEventListener("click", battle);

function BattleSimulation(firstHero, secondHero) {
  const firstHeroPowerCount = firstHero.powers.length;
  const secondHeroPowerCount = secondHero.powers.length;

  if (firstHeroPowerCount > secondHeroPowerCount) {
    console.log(`${firstHero.name} wins the battle!`);
  } else if (firstHeroPowerCount < secondHeroPowerCount) {
    console.log(`${secondHero.name} wins the battle!`);
  } else {
    console.log(
      `It's a draw! Both ${firstHero.name} and ${secondHero.name} have the same power now.`
    );
  }
}

BattleSimulation(superheroes[0], superheroes[1]);
