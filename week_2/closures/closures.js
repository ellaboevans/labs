const Person = {
  name: "Evans Elabo",
  age: 18,
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.\n`
    );
  },
};

// direct call
// Person.greet();

// using the call()
Person.greet.call(Person);

// using apply()
Person.greet.apply(Person);

// using bind()
const greetPerson = Person.greet.bind(Person);
greetPerson();

// Event handlers
const button = document.createElement("button");
button.textContent = "Click me";
button.setAttribute("id", "btn");

document.body.appendChild(button);

function handleClick() {
  console.log(this.id);
  console.log(this.textContent);
}

// using function declaration
button.addEventListener("click", handleClick); // returns values as expected

// using arrow function
button.addEventListener("click", () => {
  console.log(this.id);
  console.log(this.textContent);
}); // returns undefined values the event is fired

function createCounter() {
  let _count = 0;
  return {
    increment() {
      _count++;
      console.log(this._count); //undefined because of `this` keyword
    },
    getCount() {
      return _count;
    },
  };
}

const counter = createCounter();
counter.increment();

console.log(counter.getCount()); // returns 1

// countdown timer function
function createTimer(duration, elementId) {
  let remainingTime = duration;
  let element = document.createElement("div");

  element.setAttribute("id", elementId);
  document.body.appendChild(element);

  const timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      element.textContent = remainingTime;
    } else {
      clearInterval(timerInterval);
      console.log("Time is up!");
      element.textContent = "Time is up!";
    }
  }, 1000);
}

createTimer(20, "timerElement");
createTimer(50, "countDownTimer");
