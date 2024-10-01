# TS-Fundamentals

This repository contains fundamental concepts and code examples to help understand TypeScript, a strongly typed superset of JavaScript. The code included covers essential TypeScript features such as type annotations, functions, interfaces, classes, and modules.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Code Overview](#code-overview)
  - [Type Annotations](#type-annotations)
  - [Functions](#functions)
  - [Interfaces](#interfaces)
  - [Classes](#classes)
  - [Modules](#modules)
- [Contributing](#contributing)
- [License](#license)

## Introduction

TypeScript improves JavaScript by adding static types. This repository explores the fundamental concepts that you need to know in order to work effectively with TypeScript. Each section is focused on different language features, making it easier to get started and apply TypeScript in real projects.

## Installation

To run the code in this repository, ensure that you have **Node.js** and **TypeScript** installed on your machine.

1. Install Node.js from [here](https://nodejs.org/)
2. Install TypeScript globally using npm:

```bash
npm install -g typescript
```

3. Clone this repository:

```bash
git clone https://github.com/BhoomiGohil/TS-Fundamentals.git
cd TS-Fundamentals
```

4. Compile and run the TypeScript files:

```bash
tsc index.ts
node index.js
```

## Code Overview

### Type Annotations

TypeScript allows you to explicitly define types for variables. This helps catch errors at compile time.

Example:

```typescript
let message: string = "Hello, TypeScript!";
console.log(message);
```

In this example, the variable `message` is declared with the type `string`, which ensures that only string values can be assigned to it.

### Functions

You can add type annotations to function parameters and return values, providing better readability and debugging.

Example:

```typescript
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(5, 3));
```

Here, the function `add` accepts two parameters of type `number` and returns a `number`.

### Interfaces

Interfaces define the structure of objects. They ensure that objects follow a specific shape or contract.

Example:

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John Doe",
  age: 30,
};

console.log(user);
```

In this case, the `User` interface defines that a user object must have `name` as a string and `age` as a number.

### Classes

TypeScript supports object-oriented programming with classes. You can define properties and methods in a class.

Example:

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`${this.name} makes a sound.`);
  }
}

const dog = new Animal("Dog");
dog.speak();
```

In this example, the `Animal` class has a constructor to initialize the `name` property and a method `speak` to print a message.

### Modules

TypeScript supports modules, which allow you to organize your code into separate files.

Example:

```typescript
// module.ts
export const greeting = "Hello, World!";

// main.ts
import { greeting } from "./module";
console.log(greeting);
```

This code shows how to define a module and import it into another file.
