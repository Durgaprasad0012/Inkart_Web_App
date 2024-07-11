import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { db, storage } from "../../../Config/firebase";
import { v4 } from "uuid";
import { MdDelete } from "react-icons/md";

import AdminHeader from "../AdminHeader/AdminHeader";
import CommonInput from "../../../common/CommonInput/CommonInput";
import CommonButton from "../../../common/CommonButtton/CommonButton";

import "./AdminCategory.css";

const AdminCategory = () => {
  const [catename, setCatename] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const categoryList = useSelector((state) => state.categoryList);

 

  // ################ Handle Submit ####################
  const handleFileSubmit = async () => {
    if (selectedFile == null) return;
    const imageRef = ref(storage, `category/${v4() + '_'+selectedFile.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);
      const data = {
        name: catename.trim(),
        img: url,
        storagePath: snapshot.ref.fullPath,
      };
      await addDoc(collection(db, "category"), data);
      alert("File uploaded");
      setCatename("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
    console.log("File uploaded succefully...!");
  };

  const handleDeleteItem = async (id, storagePath) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, "category", id));

      // Delete the associated file from Firebase Storage
      const fileRef = ref(storage, storagePath);
      await deleteObject(fileRef);
      alert("Category successfully deleted!");
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  return (
    <div id="adminCategory" className="adminCategory">
      <AdminHeader />
      <div className="addCategory">
        <b>Add Categories</b>
        <div>
          <CommonInput
            type="text"
            labeltxt="Category Name"
            value={catename}
            onChange={(e) => setCatename(e.target.value)}
          />
        </div>
        <div className="inputFile">
          <input
            type="file"
            id="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            required
          />
          <label htmlFor="file" className="btn-2">
            upload
          </label>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <CommonButton
            bgcolor="success"
            title="Add Category"
            width="30%"
            onClick={handleFileSubmit}
          />
        </div>
      </div>
      <div className="cateList">
        {categoryList.map((data, index) => (
          <div key={index} className="categoryBox">
            <img src={data.img} alt={data.name} />
            <b>{data.name}</b>
            <MdDelete
              size={25}
              className="icon"
              onClick={() => handleDeleteItem(data.id, data.img)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategory;
