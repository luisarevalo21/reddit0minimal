import React from "react";

import "./Spinner.css";
const Spinner = props => {
  if (props.isLoading) {
    return <div className="loader">Loading...</div>;
  } else {
    return "";
  }
};

export default Spinner;
