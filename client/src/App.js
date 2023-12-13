import React from "react";
import {Route, Routes} from "react-router-dom";
import "./style/App.css"
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import NewPost from "./pages/NewPost";
import LogOut from "./pages/LogOut";
import Edit from "./pages/Edit";
import Search from "./pages/Search";
function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/log-in' element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path='/profile/:visitUserName' element={<Profile />} />
        <Route path="/log-out" element={<LogOut />} />
        <Route path="/search" element={<Search />} />
      </Routes>
  );
}

export default App;
