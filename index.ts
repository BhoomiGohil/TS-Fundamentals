// ----------------------- Types by Inference -----------------------

// If you hover on helloWorld variable and see dialog box that called inference.
let helloWorld = "Hello World"; // Inference

// ----------------------- Defining Types -----------------------

//Object
const user = {
  name: "Hayes",
  id: 0,
};

// Interface
interface User {
  name: string /* type annotation */;
  id: number /* type annotation */;
}

//Object declare with interface type
const user2: User = {
  name: "Hayes",
  id: 0,
};

const user3: User = {
  name: "Blah",
  // username: "Hayes", // Object literal may only specify known properties, and 'username' does not exist in type 'User'.
  id: 0,
};

// Class
class UserAccount {
  name: string /* type annotation */;
  id: number /* type annotation */;

  constructor(
    name: string /* type annotation */,
    id: number /* type annotation */
  ) {
    this.name = name;
    this.id = id;
  }
}

const user4: User = new UserAccount("Murphy", 1);

function deleteUser(user: User) {
  // Use User Inteface for parameter
  // ...
}

function getAdminUser(): User {
  // Use User Inteface for function return
  //...
  const user = { name: "Bhoomi", id: 1 };
  return user;
}

// ----------------------- Composing Types - you can create complex types by combining simple ones. There are two popular ways to do so: with unions, and with generics. -----------------------

//Unions
type MyBool = true | false /* type annotation */;

type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

// Union on parameters
function getLength(obj: string | string[] /* type annotation */) {
  return obj.length;
}

// Typeof
function wrapInArray(obj: string | string[] /* type annotation */) {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}

// Generic
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string /* type annotation */ }>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

const backpack: Backpack<string> = {
  add: (obj) => obj,
  get: () => "",
};

const object = backpack.get();

console.log(backpack.add("Hello"), backpack.get());

// Since the backpack variable is a string, you can't pass a number to the add function.
// backpack.add(23);

const backpack2: Backpack<number> = {
  add: (obj) => obj,
  get: () => 0,
};

const object3 = backpack2.add(24);

// ----------------------- Structural Type System - One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural typing”. -----------------------

interface Point {
  x: number /* type annotation */;
  y: number /* type annotation */;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

const color = { hex: "#187ABF" };
// logPoint(color); // hex is not available in Point interface

class VirtualPoint {
  x: number /* type annotation */;
  y: number /* type annotation */;

  constructor(
    x: number /* type annotation */,
    y: number /* type annotation */
  ) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"

// ----------------------- The Basics -----------------------

// Accessing the property 'toLowerCase'
// on 'message' and then calling it

// message.toLowerCase(); // message variable is not instialized before using.

// Calling 'message'
// message(); // message is not a function in js / This expression is not callable. Type 'String' has no call signatures in ts.

const message = "Hello World!";

// function fn(x) {
//   return x.flip; // x.flip is not a function
// }

// fn();

// ----------------------- Static type-checking -----------------------

const message2 = "hello!";

// TypeScript will give us an error message before we run the code in the first place.
// message2(); // This expression is not callable. Type 'String' has no call signatures.

// ----------------------- Non-exception Failures -----------------------

const user5 = {
  name: "Bhoomi",
  age: 26,
};

// user.location; // returns undefined in js / Property 'location' does not exist on type '{ name: string; age: number; }' in ts.

const announcement = "Hello World!";

// How quickly can you spot the typos?
announcement.toLocaleLowerCase();
// announcement.toLocalLowerCase(); // Property 'toLocalLowerCase' does not exist on type '"Hello World!"'. Did you mean 'toLocaleLowerCase'?

// We probably meant to write this...
announcement.toLocaleLowerCase();

function flipCoin() {
  // Meant to be Math.random()
  // return Math.random < 0.5; // Operator '<' cannot be applied to types '() => number' and 'number'.
}

const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  //..
}
// else if (value === "b") {
//   // This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
//   // Oops, unreachable
// }

// ----------------------- tsc, the TypeScript compiler -----------------------

// Install TypeScript using npm
// npm install -g typescript

// Greets the world.
console.log("Hello world!");

// Compile Code
// tsc hello.ts

// This is an industrial-grade general-purpose greeter function:
// function greet(person, date) {
//   // Parameter 'person' & 'date' implicitly has an 'any' type.
//   console.log(`Hello ${person}, today is ${date}`);
// }

// greet("Brendan"); // Expected 2 arguments, but got 1.

// ----------------------- Explicit Types -----------------------

function greet2(
  person: string /* type annotation */,
  date: Date /* type annotation */
) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

// Calling Date() in JavaScript returns a string. On the other hand, constructing a Date with new Date() actually gives us what we were expecting.
// greet2("Brendon", Date()); // Argument of type 'string' is not assignable to parameter of type 'Date'.

greet2("Brendan", new Date());

// ----------------------- Types -----------------------

// Primitive: string, number, boolean;
// Array : number[],  Array<number>,  string[], Array<string>
// any, that you can use whenever you don’t want a particular value to cause typechecking errors.

let obj: any /* type annotation */ = { x: 0, foo: () => console.log("Hello") };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
// obj(); // It is not a function
obj.bar = 100;
obj = "hello";
const n: number /* type annotation */ = obj;

// The any type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.

// ----------------------- Type Annotations on Variables -----------------------

let myName: string /* type annotation */ = "Alice"; // When you declare a variable using const, var, or let, you can optionally add a type annotation to explicitly specify the type of the variable:

// ----------------------- Functions -----------------------

// Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.

// ----------------------- Parameter Type Annotations -----------------------
function greet3(name: string /* type annotation */) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}

// Would be a runtime error if executed!
// greet2(42); // Argument of type 'number' is not assignable to parameter of type 'string'.

greet3("Bhoomi");

// ----------------------- Return Type Annotations -----------------------

function getFavoriteNumber(): number /* type annotation */ {
  return 26;
}

// ----------------------- Functions Which Return Promises -----------------------

// If you want to annotate the return type of a function which returns a promise, you should use the Promise type:

async function getFavoriteNumber2(): Promise<number> /* type annotation */ {
  return 26;
}

// ----------------------- Anonymous Functions -----------------------

const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});

// ----------------------- Object Types -----------------------

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number /* type annotation */ }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's x value is " + pt.y);
}

printCoord({ x: 3, y: 7 });

// ----------------------- Optional Properties -----------------------

function printName(obj: { first: string; last?: string }) {
  // ? use for optional properties
  //..
}

// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

function printName2(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!

  // console.log(obj.last.toUpperCase());
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}

// ----------------------- Union -----------------------

// The first way to combine types you might see is a union type. Let’s write a function that can operate on strings or numbers:

function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

printId(101);
printId("202");
// printId({ myID: 22342 }); // Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.

function printId2(id: number | string) {
  // console.log(id.toUpperCase()); // Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.

  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    console.log("Hello, " + x.join(" and "));
  } else {
    console.log("Welcome lone traveler " + x);
  }
}

// Common method for number and string
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

// ----------------------- Type Aliases - A type alias is exactly that - a name for any type. -----------------------

type Point2 = {
  x: number;
  y: number;
};

function printCoord2(pt: Point2) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord2({ x: 100, y: 100 });

type ID = number | string;

type UserInputSanitizedString = string;

type UserInputSanitizedNumber = number;

function getInput() {
  return "Hello";
}

function sanitize(str: string) {
  return str;
}

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// Create a sanitized input
let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
userInput = "new input";

// ----------------------- Interfaces - An interface declaration is another way to name an object type: -----------------------

interface Point4 {
  x: number;
  y: number;
}

function printCoord3(pt: Point4) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord3({ x: 100, y: 100 });

// Differences Between Type Aliases and Interfaces
/* Almost all features of an interface are available in type, the key distinction is that a type cannot be 
   re-opened to add new properties vs an interface which is always extendable.*/

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

function getBear(name: string, honey: boolean): Bear {
  return { name: name, honey: honey };
}

const bear = getBear("Messy", true);
bear.name;
bear.honey;

console.log(bear);

interface Window {
  title: string;
}

interface Window {
  // ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
// window.ts.transpileModule(src, {});

type Animal2 = {
  name: string;
};

type Bear2 = Animal2 & {
  honey: boolean;
};

function getBear2(name: string, honey: boolean): Bear2 {
  return { name: name, honey: honey };
}

const bear2 = getBear2("Bear", true);
bear2.name;
bear2.honey;

console.log(bear2);

type Window2 = {
  title: string;
};

// Error: Duplicate identifier 'Window'.
// type Window2 = {
//   ts: TypeScriptAPI;
// };

// ----------------------- Type Assertions - Sometimes you will have information about the type of a value that TypeScript can’t know about. -----------------------

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

// const x = "hello" as number;

const x2 = "hello" as string;

// const a = expr as any as T;

//  ----------------------- Literal -----------------------

let changeString = "Hello World";
changeString = "Ola Mundo";
// Because `changeString` can represent any possible string, that
// is how TypeScript describes it in the type system
changeString;

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;

let x3: "Hello" = "Hello";
// OK
x3 = "Hello";
// ...
// x3 = "Howdy"; // Type '"howdy"' is not assignable to type '"hello"'.

function printText(s: string, alignment: "left" | "right" | "center") {
  //..
}

printText("Hello, world", "left");
// printText("G, day", "mate", "centre"); // Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

interface Options {
  width: number;
}

function configure(x: Options | "auto") {
  //..
}

configure({ width: 100 });
configure("auto");
// configure("automatic"); // Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.

const obj2 = { counter: 0 };
if (true) {
  obj2.counter = 1;
}

function handleRequest(url: string, method: "GET" | "POST"): void {}

const url = "https://example.com";
const method = "GET";

handleRequest("Helo", "GET"); // This can work as we are passing data directlty.

handleRequest(url, method); // This can work as we are passing data directlty using const variable.

const req = { url: "https://example.com", method: "GET" };

// This is not working because req.method is inferred to be string, not "GET".
// handleRequest(req.url, req.method); // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.

// This will work
// You can change the inference by adding a type assertion in either location:
const req2 = { url: "https://example.com", method: "GET" as "GET" };
handleRequest(req2.url, req2.method);

// This will work
// You can use as const to convert the entire object to be type literals:
const req3 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req3.url, req3.method);

// The as const suffix acts like const but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like string or number.

// ----------------------- null and undefined -----------------------

function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

// ----------------------- Postfix! -----------------------

// TypeScript also has a special syntax for removing null and undefined from a type without doing any explicit checking. Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined:
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

// Just like other type assertions, this doesn’t change the runtime behavior of your code, so it’s important to only use ! when you know that the value can’t be null or undefined.

// ----------------------- Narrowing -----------------------

// function padLeft(padding: number | string, input: string): string {
//   return " ".repeat(padding) + input; // repeat only takes number not string
// }

function padLeft2(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

// ----------------------- typeof - type guards -----------------------

function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    // for (const s of strs) { // strs is null
    //   console.log(s);
    // }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

// ----------------------- Truthiness narrowing -----------------------

function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

// both of these result in "true"
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true, value: true

function printAll2(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

function printAll3(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}

// ----------------------- Equality narrowing -----------------------

function example(x: string | number, y: string | boolean) {
  if (x === y) {
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}

function printAll4(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

interface Container {
  value: number | null | undefined;
}

function mutiplyValue(container: Container, factor: number) {
  // Remove both "null" and "undefined" from the type
  if (container.value != null) {
    console.log(container.value);
    // Now we can safely multply "container.value".
    container.value *= factor;
  }
}

// ----------------------- The in operator narrowing -----------------------

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}

function move2(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
  } else {
    animal;
  }
}

// ----------------------- instanceof narrowing -----------------------

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

// ----------------------- Assignments -----------------------

let x = Math.random() < 0.5 ? 10 : "hello world";

x = 1;

console.log(x);

x = "goodbye!";

console.log(x);

// x = true; // Type 'boolean' is not assignable to type 'string | number'.

// ----------------------- Control flow analysis -----------------------

function padLeft3(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

function example2() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
  } else {
    x = 100;
    console.log(x);
  }

  return x;
}

// ----------------------- Using type predicates -----------------------

// To define a user-defined type guard, we simply need to define
// a function whose return type is a type predicate:

declare function getSmallPet(): Fish | Bird;

function isFish(pet: Fish | Bird): pet is Fish {
  // "pet is Fish" is our type predicate in this example.
  // A predicate takes the form parameterName is Type,
  // where parameterName must be the name of a parameter
  // from the current function signature.
  return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];

const underwater1: Fish[] = zoo.filter(isFish);
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  // if (pet.name === "sharkey") return false;
  return isFish(pet);
});

// ----------------------- Discriminated unions -----------------------

interface Shape {
  kind: "circle" | "sqaure";
  radius?: number;
  sideLenght?: number;
}

function handleShape(shape: Shape) {
  // oops!
  // if (shape.kind === "rect") {
  //   // This comparison appears to be unintentional because the types '"circle" | "sqaure"' and '"rect"' have no overlap.
  //   //.
  // }
}

function getArea(shape: Shape) {
  // return Math.PI * shape.radius ** 2;
  // 'shape.radius' is possibly 'undefined'.
}

function getArea2(shape: Shape) {
  if (shape.kind === "circle") {
    // return Math.PI * shape.radius ** 2;
    // 'shape.radius' is possibly 'undefined'.
  }
}

function getArea3(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape2 = Circle | Square | Triangle;

function getArea4(shape: Shape2) {
  // return Math.PI * shape.radius ** 2;
  // Property 'radius' does not exist on type 'Shape'.
  //   Property 'radius' does not exist on type 'Square'.
}

function getArea5(shape: Shape2) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}

// ----------------------- Exhaustiveness checking -----------------------

function getArea6(shape: Shape2) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}

function getArea7(shape: Shape2) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
    // const _exhaustiveCheck: never = shape; // Type 'Triangle' is not assignable to type 'never'.
    // return _exhaustiveCheck;
  }
}

// ----------------------- Functions -----------------------

function greeter(fn: (a: string) => void) {
  // The syntax (a: string) => void means “a function with one parameter,
  // named a, of type string, that doesn’t have a return value”.
  fn("Hello World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

type GreetFunction = (a: string) => void;

function greeter2(fn: GreetFunction) {}

// ----------------------- Call Signatures -----------------------

type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething2(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";

doSomething2(myFunc);

// ----------------------- Construct Signatures -----------------------

type SomeObject = any;

type SomeConstructor = {
  new (s: string): SomeObject;
};

function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}

// ----------------------- Generic Functions -----------------------

function firstElement(arr: any[]) {
  return arr[0];
}

function firstElement2<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

const str = firstElement2(["a", "b", "c"]);
const num = firstElement2([1, 2, 3]);
const und = firstElement2([]);

function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));
const parsed2 = map([1, 2, 3], (n) => n.toString());

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else return b;
}

longest([1, 2], [1, 2, 3]);
longest("aline", "bob");
// longest(01, 1000); Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.

function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // return { length: minimum };
  }
}

// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));
