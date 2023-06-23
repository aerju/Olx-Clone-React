import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();
  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPost);
        
      });
  });

  return products.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {/* <div className="cards" > */}
          {products.map((product, index) => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/view");
                }}
                key={index}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="Loading....." />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.creaetedDate}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* </div> */}
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product, index) => {
            return (
              <div className="card" key={index}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.creaetedDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
