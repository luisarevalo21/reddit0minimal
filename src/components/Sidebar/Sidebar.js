import React from "react";
import SideCards from "../Card/SideCards/SideCards";
import "./Sidebar.css";
import Error from "../Error/Error";
const Sidebar = props => {
  const { subreddits, selectedSubreddit, error, handleError } = props;

  // const [redditTopic, setredditTopic] = useState([]);

  const handleClick = url => {
    props.handleClick(url);
  };

  //fetch subreddits https://www.reddit.com/subreddits/.json

  // const data = [
  //   { title: "Home", avatar: avatar, topic: "" },
  //   { title: "AskReddit", avatar: avatar, topic: "AskReddit" },
  // ];

  let cards = "";
  if (subreddits) {
    cards = subreddits.map(subreddit => (
      <SideCards
        key={subreddit.url}
        isLoading={props.isLoading}
        title={subreddit.title}
        avatar={subreddit.avatar}
        handleClick={handleClick}
        url={subreddit.url}
        selectedSubreddit={selectedSubreddit}
      />
    ));
  }
  if (error) {
    cards = <Error error={error} handleError={handleError} />;
  }
  return (
    <ul className="SideCardContainer">
      <h2>Subreddits</h2>

      {/* {props.isLoading && <Spinner isLoading={props.isLoading} />} */}
      {cards}
    </ul>
  );
};

export default Sidebar;
