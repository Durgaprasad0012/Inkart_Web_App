import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./CommonSearch.css";

const CommonSearch = (props) => {
  const {onChange, handleSearchSubmit, value} = props

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="searchForm"
    >
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search here..."
        value={value}
        onChange={onChange}
      />
      <AiOutlineSearch size={20} onClick={handleSearchSubmit} />
    </form>
  );
};

export default CommonSearch;
