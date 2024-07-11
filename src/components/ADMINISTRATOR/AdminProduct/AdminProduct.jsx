import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { db, storage } from "../../../Config/firebase";
import { v4 } from "uuid";
import AdminHeader from "../AdminHeader/AdminHeader";
import CommonInput from "../../../common/CommonInput/CommonInput";
import CommonButton from "../../../common/CommonButtton/CommonButton";
import CommonSearch from "../../../common/CommonSearch/CommonSearch";

import { MdArrowCircleRight, MdDelete, MdEdit } from "react-icons/md";
import "./AdminProduct.css";

const AdminProduct = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [discription, setDiscription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productId, setProductId] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [storagePath, setStoragePath] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const categoryList = useSelector((state) => state.categoryList);

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
          discription: doc.data().discription,
          storagePath: doc.data().storagePath,
        }));
        setProducts(productDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();

    if (formData === "") {
      setSearchedData([]);
      return;
    }

    // Set up polling to fetch data every 5 seconds (50 00 milliseconds)
    const intervalId = setInterval(fetchProducts, 5000);  

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [productName, formData]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "products"),
        where("name", "==", formData)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc) =>
        setSearchedData({
          id: doc.id,
          name: doc.data().name,
          img: doc.data().img,
          price: doc.data().price,
          quantity: doc.data().quantity,
          storagePath: doc.data().storagePath,
        })
      );
    } catch (error) {
      console.warn("Error : ", error);
    }
  };

  const handleAddProduct = async () => {
    if (selectedFile == null) return;
    const imageRef = ref(storage, `product/${v4() + selectedFile.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);
      const data = {
        name: productName.trim(),
        discription: discription.trim(),
        quantity: quantity.trim(),
        price: price.trim(),
        categoryID: selectCategory,
        img: url,
        storagePath: snapshot.ref.fullPath,
      };
      await addDoc(collection(db, "products"), data);
      alert("File uploaded");
      setProductName("");
      setDiscription("");
      setPrice("");
      setQuantity("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  // delete products

  const handleDeleteProduct = async (id, storagePath) => {
    alert(id, storagePath);
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, "products", id));

      // Delete the associated file from Firebase Storage
      const fileRef = ref(storage, storagePath);
      await deleteObject(fileRef);
      alert("successfully deleted!");
      searchedData([]);
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  // updated
  const handleUpdated = (data) => {
    setProductId(data.id);
    setProductName(data.name);
    setDiscription(data.discription);
    setQuantity(data.quantity);
    setPrice(data.price);
    setSelectedFile(data.img);
    setStoragePath(data.storagePath);
    setIsUpdated(!isUpdated);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
  };

  // handleUpdateProduct
  const handleUpdateProduct = async () => {
    const fileRef = ref(storage, storagePath);
    try {
      await deleteObject(fileRef);
      console.log("Product deleted..!");

      if (selectedFile == null) return;

      const imageRef = ref(
        storage,
        `product/${v4() + "_" + selectedFile.name}`
      );
      const snapshot = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);

      const data = {
        name: productName.trim(),
        discription: discription.trim(),
        quantity: quantity, // Assuming quantity is numeric
        price: price, // Assuming price is numeric
        img: url,
        storagePath: snapshot.ref.fullPath,
      };

      const docRef = doc(db, "products", productId);
      await updateDoc(docRef, data);
      alert("Product updated successfully");
    } catch (error) {
      console.log(error);
    }

    setProductName("");
    setDiscription(""); // Corrected typo
    setQuantity("");
    setPrice("");
    setSelectedFile(null);
    setIsUpdated(!isUpdated);
  };

  // handleNavigate
  const handleNavigate = (id) => {
    navigate("/AdminProductView", { state: { id } });
  };

  return (
    <div>
      <AdminHeader />
      <div className="product-container">
        <div className="formBox" id="formBox">
          <div className="titleBox">
            <h3> {isUpdated ? "Update products" : " Add Products"}</h3>
          </div>
          <CommonInput
            type={"text"}
            labeltxt={"Enter the product name.."}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <CommonInput
            type={"textaria"}
            labeltxt={"Enter the product discription.."}
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
          <CommonInput
            type={"number"}
            labeltxt={"Price"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <CommonInput
            type={"number"}
            labeltxt={"Quantity"}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="select">
            <select
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
              name="category"
              id="category"
            >
              {categoryList?.map((data, index) => {
                return <option value={data.id} key={index} >{data.name}</option>;
              })}
            </select>
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

          {!isUpdated ? (
            <CommonButton
              title={"submit"}
              bgcolor={"success"}
              width={"90%"}
              onClick={() => handleAddProduct()}
            />
          ) : (
            <CommonButton
              title={"Update"}
              bgcolor={"success"}
              width={"90%"}
              onClick={() => handleUpdateProduct()}
            />
          )}
        </div>
        <div className="search">
          <CommonSearch
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            handleSearchSubmit={(e) => handleSearchSubmit(e)}
          />
        </div>
        <div className="productList">
          {formData === "" ? (
            products.map((data, index) => {
              return (
                <div key={index} className="productView">
                  <div className="iconBox">
                    <MdEdit
                      size={25}
                      className="icon"
                      onClick={() => handleUpdated(data)}
                    />
                    <MdDelete
                      size={25}
                      className="icon"
                      onClick={() =>
                        handleDeleteProduct(data.id, data.storagePath)
                      }
                    />
                  </div>
                  <div className="imgBox">
                    <img src={data.img} alt={data.name} />
                  </div>
                  <h2>{data.name}</h2>
                  <h3>from start ₹ {data.price}</h3>
                  <MdArrowCircleRight
                    size={50}
                    className="icon"
                    onClick={() => handleNavigate(data.id)}
                  />
                </div>
              );
            })
          ) : searchedData.length !== 0 ? (
            <div className="productView">
              <div className="iconBox">
                <MdEdit
                  size={25}
                  className="icon"
                  onClick={() => handleUpdated(data)}
                />
                <MdDelete
                  size={25}
                  className="icon"
                  onClick={() =>
                    handleDeleteProduct(
                      searchedData.id,
                      searchedData.storagePath
                    )
                  }
                />
              </div>
              <div className="imgBox">
                <img src={searchedData.img} alt={searchedData.name} />
              </div>
              <h2>{searchedData.name}</h2>
              <h3>from start ₹ {searchedData.price}</h3>
              <MdArrowCircleRight
                size={50}
                className="icon"
                onClick={() => handleNavigate(searchedData.id)}
              />
            </div>
          ) : (
            <div className="productView">
              <h1>no data here...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
