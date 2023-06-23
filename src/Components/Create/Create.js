import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fullDate = [year, month, day].join("-");
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then(async (url) => {
         const jsonData=await firebase.firestore().collection("products").add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            creaetedDate: fullDate,
          });
          console.log(jsonData);
          localStorage.setItem('firebaseData', jsonData);
          navigate("/");
        });
      });
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          {/* <form> */}
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            // defaultValue="John"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            // defaultValue="John"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />
          {/* </form> */}
          <br />
          <img
            alt=""
            width="80px"
            height="80px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>{" "}
          <br></br>
          {/* <form> */}
          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
          {/* </form> */}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
