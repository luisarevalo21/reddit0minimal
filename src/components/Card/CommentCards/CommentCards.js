import React from "react";

import "./CommentCards.css";
const CommentCards = props => {
  return (
    <div className="comment-card">
      <div className="meta-data">
        <h4>{props.author}</h4>
        <p>{props.timestamp}</p>
      </div>

      <p className="comment-text">{props.text}</p>
    </div>
  );
};

export default CommentCards;
