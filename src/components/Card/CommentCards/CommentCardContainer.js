import React from "react";
import CommentCards from "./CommentCards";
const CommentCardContainer = props => {
  // console.log(props);

  const { comments } = props;

  // if (isLoadingComments) {
  //   commentContainer = <Spinner isLoading={isLoadingComments} />;
  // } else {
  // console.log(comments);
  const commentContainer = comments.map(comment => (
    <CommentCards
      author={comment.author}
      text={comment.text}
      timestamp={comment.timestamp}
    />
  ));

  return commentContainer;
};

export default CommentCardContainer;
