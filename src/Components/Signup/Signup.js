import React, { useContext, useState, useEffect } from "react";

import Logo from "../../olx-logo.png";

import "./Signup.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError("");
    }, 2000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);

  function handleSubmit(event) {
    event.preventDefault();

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.updateProfile({ displayName: userName }).then(() => {
            firebase
              .firestore()
              .collection("user")
              .add({
                id: result.user.uid,
                userName: userName,
                phone: phone,
              })
              .then(() => {
                navigate("/login");
              });
          });
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div>
      {error && (
        <span
          style={{
            position: "absolute",
            top: 60,
            left: 500,
            display: "block",
            color: "red",
            width: "800px",
            height: "20px",
          }}
        >
          {error}
        </span>
      )}
      <br></br>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="loading"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            // defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            // defaultValue="John"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            alt="loading"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            // defaultValue="Doe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to={"/login"} style={{ color: "black", textDecoration: "none" }}>
          Login
        </Link>
      </div>
    </div>
  );
}
