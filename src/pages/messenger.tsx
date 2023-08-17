import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";

import jwt_decode from "jwt-decode";

import DialogCard from "../components/messenger/DialogCard";
import Conversation from "./conversation";
import { userApi } from "../store/services/userService";
import Spinner from "../components/SpinnerLoader";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setFriends } from "../store/slices/friendsSlice";
import { io } from "socket.io-client";
import ProfileNav from "../components/ProfileNav";

// Define a service using a base URL and expected endpoints
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5003";

const socket = io(baseUrl);

export type TLastMessage = {
  friendId: string;
  avatar: string;
  name: string;
  date: string;
  text: string;
};

const Messenger = () => {
  const dispatch = useAppDispatch();

  // получить токен из localStorage
  const token = localStorage.getItem("token");
  // @ts-ignore
  const userId = token ? jwt_decode(token).id : null;

  const [dataDialogs, setDataDialogs] = useState<TLastMessage[]>([]);
  const [dataDialogsLoading, setDataDialogsLoading] = useState<boolean>(true);

  const MemoizedDialogCard = React.memo(DialogCard, (prevProps, nextProps) => {
    console.log(prevProps.dataDialogs);
    return prevProps.dataDialogs === nextProps.dataDialogs;
  });

  // сортировка диалогов по времени последнего сообщения
  const sortDialogsByTime = (arr: any) => {
    if (arr.length > 0) {
      return arr.sort((a: any, b: any) => {
        if (a?.date > b?.date) {
          return -1;
        }
        if (a?.date < b?.date) {
          return 1;
        }
        return 0;
      });
    } else {
      return [];
    }
  };

  const [getFriends] = userApi.useGetFriendsMutation();
  const friends = useAppSelector((state) => state.friends.friends);

  // получить id друга из url
  const params = useParams();
  const friendId = params.id;

  // функция на получение друзей
  const getFriendsAndSave = () => {
    getFriends(userId).then((res: any) => {
      let dataDialogs = res.data.map((item: any) => ({
        friendId: item._id,
        avatar: item.avatar,
        name: item.name,
        date: item.messages[item.messages.length - 1]?.date || "",
        text: item.messages[item.messages.length - 1]?.text,
      }));
      setDataDialogs(sortDialogsByTime(dataDialogs));
      dispatch(setFriends(res.data));
      setDataDialogsLoading(false);
    });
  };

  // получение друзей при загрузке страницы
  useEffect(() => {
    if (friends.length <= 0) {
      getFriendsAndSave();
    } else {
      let dataDialogs = friends.map((item: any) => ({
        friendId: item._id,
        avatar: item.avatar,
        name: item.name,
        date: item.messages[item.messages.length - 1]?.date || "",
        text: item.messages[item.messages.length - 1]?.text,
      }));
      setDataDialogs(sortDialogsByTime(dataDialogs));
      setDataDialogsLoading(false);
    }
  }, []);

  // если нас добавили в друзья WebSocket
  useEffect(() => {
    // Обработка события "friendAdded" от сервера
    if (dataDialogs) {
      socket.on("friendAdded", (updatedUsers) => {
        if (updatedUsers) {
          getFriendsAndSave();
        }
      });
    }

    // Очистка обработчика события при размонтировании компонента
    return () => {
      socket.off("friendAdded");
    };
  }, [dataDialogs]);

  // если нас удалили из друзей WebSocket
  useEffect(() => {
    // Обработка события "friendAdded" от сервера
    if (dataDialogs) {
      socket.on("friendRemoved", (updatedUsers) => {
        if (updatedUsers) {
          getFriendsAndSave();
        }
      });
    }

    // Очистка обработчика события при размонтировании компонента
    return () => {
      socket.off("friendRemoved");
    };
  }, [dataDialogs]);

  const setLastMessage = (senderId: string, lastMessage: TLastMessage) => {
    if (
      (lastMessage.friendId === userId || senderId === userId) &&
      (lastMessage.friendId === friendId || senderId === friendId)
    ) {
      let dataDialogsCopy = [...dataDialogs];
      const indexOfMessage = dataDialogs.findIndex(
        (el) => el.friendId === lastMessage.friendId
      );
      dataDialogsCopy[indexOfMessage] = lastMessage;
      setDataDialogs(sortDialogsByTime(dataDialogsCopy));
    }
  };

  const handleConversation = () => {
    if (friendId && friends.length > 0) {
      let friendName = friends.find((el) => el._id === friendId)!.name || "";
      let friendAvatar =
        friends.find((el) => el._id === friendId)!.avatar || "";
      let friendMessages =
        friends.find((el) => el._id === friendId)?.messages || [];

      console.log("handleConv", friendMessages);
      return (
        <Conversation
          friendId={friendId}
          friendName={friendName}
          friendAvatar={friendAvatar}
          messages={friendMessages}
        />
      );
    } else {
      return (
        <div className="rounded-xl bg-[#20232B] w-3/4 h-[600px] overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-[#ffffff80] text-md mt-7">Выберите диалог</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="messenger">
      <Header theme="light" />
      <Container>
        <div className="w-full flex mt-16">
          <div className="mr-5">
            <ProfileNav />
          </div>
          <div className="messenger-content w-full text-white flex justify-between">
            {/* dialogs */}
            <div className="rounded-xl bg-[#20232B] w-1/3 mr-5 min-w-[200px] min-h-[20rem]">
              {/* search */}
              <div className="flex items-center justify-between px-4 pt-3">
                <input
                  placeholder="Найти.."
                  className="placeholder:!text-[#ffffff80] w-full text-sm cursor-pointer bg-[#ffffff10] outline-none  rounded-md px-3 py-2"
                />
              </div>
              <div className="flex flex-col cursor-pointer justify-center items-center w-full p-2">
                {/* {handleDialogs()} */}
                {dataDialogs.length > 0 ? (
                  dataDialogs.map((item: TLastMessage) => (
                    <MemoizedDialogCard
                      key={item.friendId}
                      dataDialogs={item}
                      setLastMessage={setLastMessage}
                    />
                  ))
                ) : dataDialogsLoading ? (
                  <div className="flex justify-center items-center w-full py-5">
                    <Spinner size={25} />
                  </div>
                ) : (
                  <div className="text-[#ffffff80] text-sm mt-7">
                    У вас пока нет друзей
                  </div>
                )}
              </div>
            </div>
            {/* conversation */}
            {handleConversation()}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Messenger;
