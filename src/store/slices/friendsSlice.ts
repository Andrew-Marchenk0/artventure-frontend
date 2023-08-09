import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../models/IMessage";
import { IUser } from "../../models/IUser";

export type TFriends = {
  friends: Array<IUser>;
  isDeprecated: boolean,
  isLoading: boolean;
  error: string;
};

const initialState: TFriends = {
  friends: [],
  isDeprecated: false,
  isLoading: false,
  error: "",
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    deleteFriend: (state, action) => {
      if (state.friends) {
        state.friends = state.friends.filter(
          (friend) => friend._id !== action.payload._id
        );
      }
    },
  },
  extraReducers: {},
});

export const { setFriends, addFriend, deleteFriend } = friendsSlice.actions;
export default friendsSlice;