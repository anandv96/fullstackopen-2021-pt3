import React from "react";
import Person from "./Person";

const PersonList = (props) => {
  return (
    <ul>
      {props.personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={props.handleDelete}
        />
      ))}
    </ul>
  );
};

export default PersonList;
