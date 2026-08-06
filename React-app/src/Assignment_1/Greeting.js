// Assignment 1
// Create a functional component called Greeting that:

// Accepts a name prop.

// Renders an <h1> saying "Hello, [name]!".

// In the App component, render <Greeting name="Alice" /> and <Greeting name="Bob" /> inside a <div>.

export default function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}