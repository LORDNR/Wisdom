import React from "react";
import Header from "./components/header/header";
import TopBar from "./components/topbar/topbar";
import Home from "./pages/home/Home";
import WisdomView from "./pages/wisdomView/WisdomView";
import NewWisdom from "./pages/newWisdom/NewWisdom";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./components/context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/newwisdom" element={user ? <NewWisdom /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/wisdom/:id" element={<WisdomView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
