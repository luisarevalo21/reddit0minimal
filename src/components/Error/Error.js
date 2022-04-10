import React from "react";
import "./Error.css";
const Error = props => {
  const { error } = props;

  return (
    <div className="error" key={error.title}>
      <h4>{error.title}</h4>
      <button onClick={props.handleError}> Fetch from home again? </button>
    </div>
  );
};

export default Error;
