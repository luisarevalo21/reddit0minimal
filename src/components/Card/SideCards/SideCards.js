import React from "react";
import "./SideCards.css";
const SideCards = props => {
  const { url, title, avatar, selectedSubreddit } = props;

  let selected = "";

  // console.log(url);
  // console.log(avatar);
  const handleClick = () => {
    props.handleClick(url);

    console.log("button pressed");
  };

  return (
    <li className="list">
      <button
        className={`SideCards ${url === selectedSubreddit ? "active" : ""} `}
        onClick={handleClick}
      >
        <img src={avatar} className="avatar" alt={avatar} />
        <p>{title}</p>
      </button>
    </li>
  );
};

export default SideCards;
