//
// Narrowing
//

// typeof

const myFunc = (param: string | number) => {
  if (typeof param === "number") {
    return param.toFixed(2);
  }

  return param.length;
};

// in

type Cat = {
  meow: () => void;
};

type Dog = {
  bark: () => void;
};

const talkToMe = (animal: Cat | Dog) => {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
};

//
// Custom guard
//

const isDog = (animal: Dog | Cat): animal is Dog => {
  return "bark" in animal;
};

const talkToMeAgain = (animal: Cat | Dog) => {
  if (isDog(animal)) {
    animal.bark();
  } else {
    animal.meow();
  }
};

//
// Type assertion
// `as`
//

const myInput = document.getElementById("my-input") as HTMLInputElement;

myInput.value;
