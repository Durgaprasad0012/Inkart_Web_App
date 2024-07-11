import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useEffect, useState } from "react";

export const ProductList = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productDetails = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          img: doc.data().img,
          price: doc.data().price,
          quantity: doc.data().quantity,
        }));
        setProductList(productDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return productList;
};
