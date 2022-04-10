import React, { useState } from "react";
import "./Card.css";
import CommentCardContainer from "../CommentCards/CommentCardContainer";
import moment from "moment";
import Spinner from "../../Spinner/Spinner";
const Card = props => {
  const {
    fetchComments,
    permaLink,
    isLoadingComments,
    comments,
    selectedPermaLink,
  } = props;

  let splitedUps = "";
  let formatedUps = props.ups;
  if (props.ups > 999) {
    splitedUps = new Intl.NumberFormat().format(props.ups).split(",");
    formatedUps = splitedUps[0] + "." + splitedUps[1].charAt(0) + "K";
  }
  const [upVoteColor, setUpVoteColor] = useState("");
  const [downVoteColor, setDownVoteColor] = useState("");

  const handleUpVote = () => {
    setUpVoteColor(upVoteColor === "" ? "up-vote" : "");
    setDownVoteColor("");
  };
  const handleDownVote = () => {
    setDownVoteColor(downVoteColor === "" ? "down-vote" : "");
    setUpVoteColor("");
  };

  const handleFetchComments = () => {
    fetchComments(permaLink);
  };

  let commentsRender = null;

  if (isLoadingComments && selectedPermaLink === permaLink) {
    commentsRender = <Spinner isLoading={isLoadingComments} />;
  } else if (selectedPermaLink === permaLink) {
    commentsRender = <CommentCardContainer comments={comments} />;
  }

  return (
    <React.Fragment key={Math.random()}>
      <div className="Card">
        <div className="votes">
          <button onClick={handleUpVote} className={upVoteColor}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <p className={[upVoteColor, downVoteColor].join("")}>{formatedUps}</p>
          <button className={downVoteColor} onClick={handleDownVote}>
            <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
        <div className="card-wrapper">
          <div className="card-content">
            <h3>{props.title}</h3>
            <div className="image-container">
              <img alt="" src={props.url_overridden_by_dest} />
            </div>
            <div className="card-footer">
              <p>{props.author}</p>
              <p>{moment.unix(props.created_utc).fromNow()}</p>
              <span className="icon">
                <button onClick={handleFetchComments}>
                  <i className="fa-solid fa-comment"></i>
                  <p className="comments">{props.totalComments}</p>
                </button>
              </span>
            </div>
          </div>
          {commentsRender}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
