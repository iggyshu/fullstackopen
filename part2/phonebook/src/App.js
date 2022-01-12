import React, { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/persons";

const Number = ({ id, name, number, onDeleteClick }) => (
  <div>
    {name} {number}
    <button onClick={() => onDeleteClick(id)}>delete</button>
  </div>
);

const Persons = ({ persons, onDeleteClick }) => (
  <div>
    {persons.map((person) => (
      <Number
        id={person.id}
        name={person.name}
        number={person.number}
        key={person.name}
        onDeleteClick={onDeleteClick}
      />
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [matchedPersons, setMatchedPersons] = useState([]);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  useEffect(() => {
    setMatchedPersons(persons);
    setSearchParam("");
  }, [persons]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (persons.find((item) => item.name === newName)) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) {
        const person = persons.find((person) => person.name === newName);
        const id = person.id;
        const newPerson = { ...person, number: newNumber };
        noteService.update(id, newPerson).then((returnedPerson) => {
          // console.log('returned person', returnedPerson);
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
        });
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      noteService.create(person).then((response) => {
        // console.log(response);
        setPersons(persons.concat([{ ...response }]));
        setNewName("");
        setNewNumber("");
      });
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

  const handleDeleteClick = (id) => {
    if (window.confirm("Do you really want to delete this entry?")) {
      noteService.remove(id).then((response) => {
        // console.log(response);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
      <Persons persons={matchedPersons} onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default App;
