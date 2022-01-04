import React, { useState } from "react";

const Number = ({ name }) => <div>{name}</div>;

const App = () => {
  const [persons, setPersons] = useState([{ id: 0, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setPersons(persons.concat([{ id: persons.length, name: newName }]));
    setNewName("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Number name={person.name} key={person.id} />
      ))}
    </div>
  );
};

export default App;
