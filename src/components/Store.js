import React from "react";
import "./Store.css";

const Store = ({ store, index, onStoreClick }) => {
  return (
    <div
      className="store-container"
      onClick={(event) => {
        onStoreClick(index+1, event);
      }}
    >
      <div className="store-container-background">
        <div className="store-info-container">
          <div className="store-address">
            <span className="roboto-regular">
              {store.name
                .split(" ")
                .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(" ")}
            </span>
            <span className="roboto-light"> {store.location.address1}</span>
          </div>

          <div className="roboto-light store-phone-number">
            <a href={store.site}>{store.site}</a>
          </div>
        </div>
        <div className="store-number-container">
          <div className="store-number">{index + 1}</div>
        </div>
      </div>
    </div>
  );
};

export default Store;
