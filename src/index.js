import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

import { FirebaseContext } from "./store/FirebaseContext";
import Context from "./store/FirebaseContext";

import firebase from "./firebase/config";

createRoot(document.getElementById("root")).render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
