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
Person.greet();

// using the call()
const anotherPersion = { name: "David Elabo", age: 27 };

Person.greet.call(anotherPersion);

// using apply()
Person.greet.apply(anotherPersion);

// using bind()
const greetPerson = Person.greet.bind(anotherPersion);
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
// button.addEventListener("click", handleClick);

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
      console.log(_count); // corrected to log the private variable _count
    },
    getCount() {
      return _count;
    },
  };
}

const counter = createCounter();
counter.increment();

console.log(counter.getCount()); // returns 1

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
      element.textContent = "Time is up!";
    }
  }, 1000);
}

createTimer(20, "timerElement");
createTimer(50, "countDownTimer");
