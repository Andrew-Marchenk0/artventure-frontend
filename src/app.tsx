import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/start";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/about";
import Event from "./pages/event";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFoundPage from "./pages/notfound";
import Header from "./components/Header";
import Events from "./pages/events";
import Recomendations from "./pages/recomendations";

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>("dark");

  return (
    <>
      <Header theme={theme} />
      <Routes>
        <Route path="/" element={<Start setTheme={setTheme} />} />
        {/* error routes  */}
        <Route
          path="/404/*"
          element={
            <ProtectedRoute children={<NotFoundPage setTheme={setTheme} />} />
          }
        />
        {/* social media app */}
        <Route
          path="/events/*"
          element={<Events setTheme={setTheme} />}
        />
        <Route path="/about/*" element={<About setTheme={setTheme} />} />
        <Route path="/recomendations/*" element={<Recomendations setTheme={setTheme} />} />
        <Route
          path="/event/:id/*"
          element={<Event setTheme={setTheme} />}
        />
        {/* auth app  */}
        <Route
          path="/login/*"
          element={
            <ProtectedRoute
              authSecure
              children={<Login setTheme={setTheme} />}
            />
          }
        />
        <Route
          path="/register/*"
          element={
            <ProtectedRoute
              authSecure
              children={<Register setTheme={setTheme} />}
            />
          }
        />
        
      </Routes>
    </>
  );
};

export default App;
