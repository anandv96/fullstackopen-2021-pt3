import { useState } from "react";
import Form from "./components/Form";
import Notification from "./components/Notification";
import PersonList from "./components/PersonList";
import { useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  const [notificationText, setNotificationText] = useState("");
  const [errorState, setErrorState] = useState(false);

  const personsToShow =
    query === ""
      ? persons
      : persons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleQueryChange = (event) => setQuery(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    // check if the person exists
    const oldPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    // person doesn't exist
    if (oldPerson === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));

          setNotificationText(`Added ${person.name}`);
          setTimeout(() => {
            setNotificationText(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorState(true);
          setNotificationText(error.response.data.error);
          setTimeout(() => {
            setErrorState(false);
            setNotificationText(null);
          }, 5000);
        });
    } else {
      // person exists in phonebook
      const result = window.confirm(
        `${oldPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (result) {
        // replace number with new
        const replacePerson = { ...oldPerson, number: newNumber };

        personService
          .update(replacePerson)
          .then((person) => {
            setPersons(persons.map((p) => (person.id !== p.id ? p : person)));

            setNotificationText(`Updated number of ${person.name}`);
            setTimeout(() => {
              setNotificationText(null);
            }, 5000);
          })
          .catch((error) => {
            // person already deleted
            console.log(`${newName} deleted from server`);
            console.log(error);
            setNotificationText(
              `Information of ${newName} has already been removed from server`
            );
            setErrorState(true);
            setTimeout(() => {
              setNotificationText(null);
              setErrorState(false);
            }, 5000);
          });
      }
    }

    // reset name and number values
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (person) => {
    const result = window.confirm(`Delete ${person.name} ?`);
    if (result) {
      personService
        .remove(person.id)
        .then((response) => {
          // update the application state
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          console.log(`${person.name} could not delete`);
          console.log(error);
          alert(`Could not delete person ${person.name}`);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification text={notificationText} errorState={errorState} />
      <Filter query={query} handleQueryChange={handleQueryChange} />

      <h2>add a new</h2>

      <Form
        handleAddPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <PersonList personsToShow={personsToShow} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
