import React, { useState } from "react";

const Number = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <Number name={person.name} number={person.number} key={person.name} />
    ))}
  </div>
);

const Filter = ({ value, onValueChange }) => (
  <div>
    filter shown with: <input value={value} onChange={onValueChange} />
  </div>
);

const PersonForm = ({
  onFormSubmit,
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
}) => (
  <form onSubmit={onFormSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [matchedPersons, setMatchedPersons] = useState(persons);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (persons.find((item) => item.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat([{ name: newName, number: newNumber }]));
      setMatchedPersons(persons.concat([{ name: newName, number: newNumber }]));
      setNewName("");
      setNewNumber("");
      setSearchParam("");
    }
  };

  const handleSearchParamChange = (event) => {
    // console.log(event.target.value);
    setSearchParam(event.target.value);
    if (event.target.value.length === 0) {
      setMatchedPersons(persons.concat());
    } else {
      const search = event.target.value.toLowerCase();
      setMatchedPersons(
        persons.filter((person) => person.name.toLowerCase().includes(search))
      );
    }
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchParam} onValueChange={handleSearchParamChange} />
      <h3>Add a new</h3>
      <PersonForm
        onFormSubmit={handleFormSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={matchedPersons} />
    </div>
  );
};

export default App;
