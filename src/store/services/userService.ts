// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../models/IUser";
import { IFriend } from "../../models/IFriend";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5003",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getPeoples: builder.query<IFriend[], string>({
      query: () => ({
        url: `api/peoples`,
        method: "GET",
        mode: "cors",
      }),
      // providesTags: ["User"],
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => ({
        url: `api/user/${id}`,
        method: "GET",
        mode: "cors",
      }),
      // providesTags: ["User"],
    }),
    getFriends: builder.mutation<IFriend[], string>({
      query: (id) => ({
        url: `api/friends`, // Подставьте правильный путь
        method: "POST",
        body: {userId: id},
        mode: "cors",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserCover: builder.mutation<IUser, Object>({
      query: (data) => ({
        url: `api/user-cover`,
        method: "POST",
        mode: "cors",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addToFriends: builder.mutation<IUser, Object>({
      query: (data) => ({
        url: `api/add-friend`,
        method: "POST",
        mode: "cors",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    removeFromFriends: builder.mutation<IUser, Object>({
      query: (data) => ({
        url: `api/remove-friend`,
        method: "DELETE",
        mode: "cors",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
