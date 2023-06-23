import React, { useContext, useEffect, useState } from "react";

import "./View.css";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/FirebaseContext";
import { useParams } from "react-router-dom";
function View() {
  // const { id } = useParams();
  const [userDetails, setUserDetails] = useState("");
  const { postDetails  } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase
      .firestore()
      .collection("user")
      .where("id", "==", postDetails?.userId)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
  }, [firebase, postDetails]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.creaetedDate}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails?.userName}</p>
            <p>{userDetails?.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
