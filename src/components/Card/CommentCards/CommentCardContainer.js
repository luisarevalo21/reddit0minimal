import React from "react";
import CommentCards from "./CommentCards";
import { useSelector } from "react-redux";
import {
  selectRedditData,
  selectSelectedPost,
} from "../../features/Reddit/redditSlice.js";

const CommentCardContainer = props => {
  const data = useSelector(selectRedditData);
  const index = useSelector(selectSelectedPost);

  const { comments } = data[index];

  if (comments)
    return comments.map(comment => (
      <CommentCards
        key={Math.random()}
        author={comment.author}
        text={comment.text}
        timestamp={comment.timestamp}
      />
    ));

  // return commentContainer;
};

export default CommentCardContainer;
