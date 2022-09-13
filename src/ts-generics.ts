//
// Generics
//

// Functions

export const identity = <T>(arg: T): T => {
  return arg;
};

function identity2<T>(arg: T): T {
  return arg;
}

identity("some string");
identity<number>(5);
identity2({ param1: "some string" });

// Narrowed generics

const getDevelopers = <E extends { type: string }>(employees: E[]): E[] => {
  return employees.filter((employee) => employee.type === "developer");
};

const getDevelopers2 = (employees: { type: string }[]): { type: string }[] => {
  return employees.filter((employee) => employee.type === "developer");
};

const employees = [
  {
    type: "developer",
    name: "Tomek Skuta",
  },
  {
    type: "HR",
    name: "Wiktoria Krzyz",
  },
];

getDevelopers(employees);
getDevelopers2(employees);

// Generic types

type ApiResponse<D> = {
  status: number;
  headers: Record<string, string>;
  data: D;
};

interface ApiResponse2<D> {
  status: number;
  headers: Record<string, string>;
  data: D;
}

type MyCallResponse = ApiResponse<{ employees: Dog[] }>;

interface Animal<C> {
  lenght: number;
  weight: number;
  numberOfLegs: number;
  customProperties: C;
}

interface Dog extends Animal<{ bark: () => void }> {}

interface Cat extends Animal<{ meow: () => void }> {}
