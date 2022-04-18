import React from "react";
import "./Error.css";

import { useDispatch } from "react-redux";
import { loadRedditData } from "../features/Reddit/redditSlice.js";
const Error = props => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loadRedditData());
  };
  const { error } = props;

  return (
    <div className="error" key={error.title}>
      <h4>{error.title}</h4>
      <button onClick={handleClick}> Fetch from home again? </button>
    </div>
  );
};

export default Error;
