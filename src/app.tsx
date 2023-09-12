import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Start from "./pages/start";
import Messenger from "./pages/messenger";
import ProtectedRoute from "./components/ProtectedRoute";
import Peoples from "./pages/peoples";
import News from "./pages/news";
import Profile from "./pages/profile";
import Countries from "./pages/countries";
import Show from "./pages/show";
import Artist from "./pages/artist";
import Artists from "./pages/artists";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import Picture from "./pages/picture";
import Country from "./pages/country";
import Timeline from "./pages/timeline";
import Colors from "./pages/colors";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";
import AdminAuthors from "./pages/admin/adminAuthors";
import AdminPictures from "./pages/admin/adminPictures";
import AdminCountries from "./pages/admin/adminCountries";
import AdminUsers from "./pages/admin/adminUsers";
import AdminModels from "./pages/admin/adminModels";
import NotFoundPage from "./pages/notfound";
import ErrorPage from "./pages/error";
import ProfileEdit from "./pages/profile/profileEdit";
import { socket } from "./hooks/socket";
import Header from "./components/Header";

const App: React.FC = () => {
  const [notAuth, setNotAuth] = React.useState<boolean>(true);
  const [theme, setTheme] = React.useState<string>("dark");
  const [onlineUsers, setOnlineUsers] = React.useState<number>(0);

  // онлайн статусы пользователей WebSocket
  socket.on("onlineUsers", (usersCount: number) => {
    setOnlineUsers(usersCount);
  });

  return (
    <>
      {notAuth && <Header theme={theme} onlineUsers={onlineUsers} />}
      <Routes>
        <Route path="/" element={<Start />} />
        {/* social media app */}
        <Route
          path="/news/*"
          element={<ProtectedRoute children={<News setTheme={setTheme} />} />}
        />
        <Route
          errorElement={<ErrorPage />}
          path="/im/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Messenger setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage />}
          path="/im/:id/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Messenger setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage />}
          path="/peoples/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Peoples setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage />}
          path="/edit/:id/*"
          element={
            <ProtectedRoute notAuthSecure>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />

        <Route
          errorElement={<ErrorPage />}
          path="/:id/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Profile setTheme={setTheme} />}
            />
          }
        />
        <Route
          errorElement={<ErrorPage />}
          path="/peoples/*"
          element={
            <ProtectedRoute
              notAuthSecure
              children={<Peoples setTheme={setTheme} />}
            />
          }
        />
        {/* error routes  */}
        <Route
          path="/404/*"
          element={<ProtectedRoute children={<NotFoundPage />} />}
        />
        {/* social media app */}
        <Route path="/countries/*" element={<Countries />} />
        <Route path="/show/*" element={<Show />} />
        <Route path="/artists/*" element={<Artists />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/contacts/*" element={<Contacts />} />
        <Route path="/show/timeline/*" element={<Timeline />} />
        <Route path="/show/colors/*" element={<Colors />} />
        <Route path="/artist/:id/*" element={<Artist />} />
        <Route path="/picture/:id/*" element={<Picture />} />
        <Route path="/country/:id/*" element={<Country />} />
        {/* auth app  */}
        <Route
          path="/login/*"
          element={<ProtectedRoute authSecure children={<Login />} />}
        />
        <Route
          path="/register/*"
          element={<ProtectedRoute authSecure children={<Register />} />}
        />
        {/* admin app  */}
        <Route
          path="/admin/*"
          element={<ProtectedRoute children={<AdminAuthors />} />}
        />
        <Route
          path="/admin/artists/*"
          element={<ProtectedRoute children={<AdminAuthors />} />}
        />
        <Route
          path="/admin/pictures/*"
          element={<ProtectedRoute children={<AdminPictures />} />}
        />
        <Route
          path="/admin/countries/*"
          element={<ProtectedRoute children={<AdminCountries />} />}
        />
        <Route
          path="/admin/users/*"
          element={<ProtectedRoute children={<AdminUsers />} />}
        />
        <Route
          path="/admin/models/*"
          element={<ProtectedRoute children={<AdminModels />} />}
        />
      </Routes>
    </>
  );
};

export default App;