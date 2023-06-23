import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import ViewPost from "./Pages/ViewPost";
import Post from "./store/PostContext";
import "./App.css";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <div>
      <Post>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
