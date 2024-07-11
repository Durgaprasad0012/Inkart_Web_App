import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebase";

import "./Category.css";
import { useDispatch } from "react-redux";
import { categoriesList } from "../../Redux/action";

const Category = () => {
  const [getCategory, setCategory] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      const fetchDatac = async () => {
        const querySnapshot = await getDocs(collection(db, "category"));
        const categories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          img: doc.data().img,
        }));
        setCategory(categories);
      };
      fetchDatac();
    } catch (error) {
      console.log(error);
    }
  }, []);
  dispatch(categoriesList(getCategory))

  return (
    <div className="Category-container" id="category">
      {getCategory.map((data, index) => {
        return (
          <div key={index} className="category-box">
            <img src={data.img} alt={data.name} />
            <p> {data.name} </p>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
