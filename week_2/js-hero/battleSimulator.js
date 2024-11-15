export const BattleSimulator = (function () {
  function battle(hero1, hero2, displayElement) {
    if (!hero1 || !hero2 || hero1.name === hero2.name) {
      displayElement.textContent =
        "Please select two different heroes for the battle.";
      return;
    }

    // Randomly choose a power for each hero
    const hero1Power =
      hero1.powers[Math.floor(Math.random() * hero1.powers.length)];
    const hero2Power =
      hero2.powers[Math.floor(Math.random() * hero2.powers.length)];

    // Compare powers
    displayElement.textContent = `Battle between ${hero1.name} and ${hero2.name}`;
    if (hero1Power > hero2Power) {
      displayElement.textContent = `${hero1.name} wins with ${hero1Power}!`;
    } else if (hero1Power < hero2Power) {
      displayElement.textContent = `${hero2.name} wins with ${hero2Power}!`;
    } else {
      displayElement.textContent = `It's a draw! Both heroes used ${hero1Power}.`;
    }
  }

  return {
    battle,
  };
})();
