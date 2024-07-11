import React, { useEffect } from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import Category from '../../Categories/Category'  
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Config/firebase'
import { categoriesList } from "../../../Redux/action";
import { useDispatch } from 'react-redux'

import './AdminHome.css'  

const AdminHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "category"));
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        img: doc.data().img,
        storagePath: doc.data().storagePath,
      }));
      dispatch(categoriesList(categories));
    } catch (error) {
      console.log(error);
    }
  };
  fetchCategories();
  // Set up polling to fetch data every 5 seconds (5000 milliseconds)
  const intervalId = setInterval(fetchCategories, 5000);

  // Clean up interval on component unmount
  return () => clearInterval(intervalId);
}, [dispatch]);
  
  
  return (
    <div id="adminHome" className='adminHome'>
      <AdminHeader /> 
      <div className="catList">
      </div>
    </div>
  )
}

export default AdminHome