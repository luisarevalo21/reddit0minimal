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
      key={Math.random()}
      author={comment.author}
      text={comment.text}
      timestamp={comment.timestamp}
    />
  ));

  return commentContainer;
};

export default CommentCardContainer;
