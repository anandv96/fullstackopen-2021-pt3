import React from "react";

const Person = (props) => {
  return (
    <li key={props.person.id}>
      {props.person.name} : {props.person.number}
      <button onClick={() => props.handleDelete(props.person)}>delete</button>
    </li>
  );
};

export default Person;
