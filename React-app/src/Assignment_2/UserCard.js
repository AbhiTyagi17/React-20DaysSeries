// Assignment 2
// Create a component called UserCard that:

// Accepts three props: name (string), age (number), and isAdmin (boolean).

// Renders a card (<div> with a border) displaying:

// "Name: [name]"

// "Age: [age]"

// "Role: Admin" if isAdmin is true, otherwise "Role: User".

// Set default props so that:

// name defaults to "Anonymous"

// age defaults to 0

// isAdmin defaults to false

// In the App component, render:

// One <UserCard /> with no props (to test defaults).

// One <UserCard name="Alice" age={30} isAdmin={true} />.

// One <UserCard name="Bob" /> (only name, to test mixed defaults).

export default function Usercard({name = 'Anonymous', age = 0, isAdmin = false}){
	return (
		<div  style={{
			border: '2px solid #333',
			borderRadius: '8px',
			padding: '16px',
			margin: '10px',
			width: '200px',
			display: 'inline-block',
			backgroundColor: '#f9f9f9'
			}}>
				<h2>Name :{name}</h2>
				<p>Age : {age}</p>
				<p>Role :{isAdmin ? "Admin" : "User"}</p>
		</div>
	);
}