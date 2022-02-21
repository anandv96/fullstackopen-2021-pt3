import React from "react";

const Form = (props) => {
  return (
    <form onSubmit={props.handleAddPerson}>
      <p>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </p>
      <p>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </p>
      <button type="submit">add</button>
    </form>
  );
};

export default Form;
