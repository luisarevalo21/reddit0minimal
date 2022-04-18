import { configureStore } from "@reduxjs/toolkit";
import redditReducer from "../components/features/Reddit/redditSlice.js";

import subRedditReducer from "../components/features/subreddit/subRedditSlice.js";
export default configureStore({
  reducer: {
    reddit: redditReducer,
    subReddit: subRedditReducer,
  },
});
