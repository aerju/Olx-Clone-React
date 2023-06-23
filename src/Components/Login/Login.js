import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";

import Logo from "../../olx-logo.png";

import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError("");
    }, 2000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [error]);
  const { firebase } = useContext(FirebaseContext);
  function handleLogin(event) {
    event.preventDefault();
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);

          setError(
            error.message.slice(
              error.message.indexOf(":") + 2,
              error.message.indexOf(".", error.message.indexOf(":") + 2) + 1
            )
          );
        });
    } catch (error) {
      setError(
        error.message.slice(
          error.message.indexOf(":") + 2,
          error.message.indexOf(" (", error.message.indexOf(":") + 2)
        )
      );
    }
  }
  return (
    <div>
      {error ? (
        <div class="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : (
        ""
      )}

      <br></br>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="loading"></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            // defaultValue="John"
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
          <button>Login</button>
        </form>
        <Link to={"/signup"} style={{ color: "black", textDecoration: "none" }}>
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
