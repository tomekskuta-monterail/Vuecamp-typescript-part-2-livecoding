//
// Built in tools and types
//

// `typeof`

export const tofik = {
  bark: () => {
    console.log("HAU HAU!");
  },
  hairType: "short",
  age: 12,
  isGoodBoy: true,
};

type Dog = typeof tofik;

type IsGoodBoy = Dog["isGoodBoy"];

// ReturnType<T> & Parameters<T>

function createArray<V extends string>(value: V, length: number): V[] {
  return new Array(length).fill(value);
}

type CreateArrayReturnType = ReturnType<typeof createArray>;
type CreateArrayParameters = Parameters<typeof createArray>;

// Partial<T>

type PartialDog = Partial<Dog>;

const partialDog: PartialDog = {
  bark: () => {},
};

// Pick<T, K extends keyof T>

type PickedDog = Pick<Dog, "hairType" | "isGoodBoy">;

// Omit<T, K extends keyof T>

type OmittedDog = Omit<Dog, "hairType" | "isGoodBoy">;
