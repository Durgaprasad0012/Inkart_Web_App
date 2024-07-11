import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { categoriesList } from "../Redux/action";

const GetCategoriesList = async () => {
  const [getCategory, setCategory] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const fetchDatac = async () => {
        const querySnapshot = await getDocs(collection(db, "category"));
        const categories = querySnapshot.docs.map((doc) => ({
          catId: doc.id,
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
};
