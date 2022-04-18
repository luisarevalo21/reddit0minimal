import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import moment from "moment";

export const loadRedditData = createAsyncThunk(
  "reddit/getAllRedditData",
  async (url, rejectWithValue) => {
    let data = null;
    let json = null;

    try {
      if (url) {
        data = await fetch(`https://www.reddit.com${url}/.json`);
        json = await data.json();
      } else {
        data = await fetch("https://www.reddit.com/r/popular/.json");
        json = await data.json();
      }

      // console.log(json);
      return json;
    } catch (error) {
      return rejectWithValue({ title: error.message });
    }
  }
);

export const fetchPostsComments = createAsyncThunk(
  "reddit/getAllPostsComments",
  async (params, { rejectWithValue }) => {
    const { permaLink, index } = params;

    try {
      const data = await fetch(`https://www.reddit.com${permaLink}/.json`);
      const json = await data.json();

      return { data: json[1].data.children, id: permaLink, index };
    } catch (error) {
      console.log(error);
      return rejectWithValue({ title: error.message });
    }
  }
);

export const redditSlice = createSlice({
  name: "reddit",
  initialState: {
    searchTerm: "",
    redditData: [],
    redditComments: [],

    selectedPost: "",
    selectedSubReddit: "",

    isLoading: false,
    hasError: false,
  },
  reducers: {
    setSelectedSubReddit: (state, action) => {
      state.selectedSubReddit = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    clearSearchTerm: (state, action) => {
      return "";
    },
  },
  extraReducers: {
    [loadRedditData.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadRedditData.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = action.payload;
    },
    [loadRedditData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.redditData = action.payload.data.children.map((element, index) => ({
        author: element.data.author,
        index: index,
        title: element.data.title,
        ups: element.data.ups,
        url_overridden_by_dest: element.data["url_overridden_by_dest"],
        created_utc: element.data["created_utc"],
        permaLink: element.data.permalink,
        totalComments: element.data["num_comments"],
      }));
    },

    [fetchPostsComments.pending]: (state, action) => {
      state.isLoading = true;
      state.selectedPost = action.meta.arg.index;
      state.hasError = false;
    },
    [fetchPostsComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = action.payload;
      console.log("inside rejceted");
    },
    [fetchPostsComments.fulfilled]: (state, action) => {
      state.selectedPost = action.payload.index;
      state.redditData[action.payload.index].comments = action.payload.data.map(
        comment => ({
          author: comment.data.author,
          text: comment.data.body,
          timestamp: moment.unix(comment.data.created_utc).fromNow(),
        })
      );
      state.isLoading = false;
      state.hasError = false;
    },
  },
});

export const {
  setSelectedSubReddit,
  setSearchTerm,
  clearSearchTerm,
  filterRedditData,
} = redditSlice.actions;

/// change this one incase search is wrong
export const selectSearchTerm = state => state.reddit.searchTerm;
export const selectRedditData = state => state.reddit.redditData;
export const selectRedditComments = state => state.reddit.redditComments;
export const selectIsLoading = state => state.reddit.isLoading;
export const selectIsLoadingComments = state => state.reddit.isLoadingComments;
export const selectHasError = state => state.reddit.hasError;
export const selectSelectedPost = state => state.reddit.selectedPost;
export const selectedSubReddit = state => state.reddit.selectedSubReddit;

export const selectFilteredPosts = createSelector(
  [selectRedditData, selectSearchTerm],

  (redditData, searchTerm) => {
    if (searchTerm !== "") {
      console.log("select filtered triggered");
      const result = redditData.filter(data =>
        data.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (result.length === 0) {
        return { error: "no results found" };
      }
    }
    return redditData;
  }
);

export default redditSlice.reducer;
