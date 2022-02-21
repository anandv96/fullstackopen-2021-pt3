import React from "react";

const Filter = (props) => {
  return (
    <div>
      filter shown with{" "}
      <input value={props.query} onChange={props.handleQueryChange} />
    </div>
  );
};

export default Filter;
