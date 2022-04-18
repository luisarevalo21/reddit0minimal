import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SubReddit = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <li className="list">
      <button onClick={handleClick}>
        <img className="avatar" />
        <p></p>
      </button>
    </li>
  );
};

export default SubReddit;
