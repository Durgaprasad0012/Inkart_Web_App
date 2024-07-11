import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { db } from "../../../Config/firebase";
import { TiArrowBack } from "react-icons/ti";

import "./AdminProductView.css";
const AdminProductView = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate()

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
          return;
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchProductById();
  }, []);
  return (
    <div className="productView">
      <header className="prodcutHeader">
        <TiArrowBack className="productIcon" onClick={()=>navigate(-1)}/>
        <h2> {product.name} </h2>
      </header>
      <div className="detailsContainer">
        <div className="subdivision">
            <img src={product?.img} alt={product.name} />
                <table>
                    <tr><th>{product.name}</th></tr>
                    <tr>    
                        <td>price</td>
                        <td>:</td>
                        <td> {product.price} </td>
                    </tr>
                    <tr>
                        <td>Quantity</td>
                        <td>:</td>
                        <td> {product.quantity} </td>
                    </tr>
                </table>
        </div>
        <h4>Description</h4>
        <ul>
            <li>
                {product.discription}
            </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminProductView;
