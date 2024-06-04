import React from "react";
import Store from "./Store";
import "./StoreList.css";

const StoreList = ({ storeList, onStoreClick }) => {
  let stores = storeList.map((store, index) => {
    return (
      <Store
        store={store}
        index={index}
        key={store.name}
        onStoreClick={onStoreClick}
      />
    );
  });


  return (
    <div className="stores-list-container">
      <div className="stores-list">{stores}</div>
    </div>
  );
};

export default StoreList;
