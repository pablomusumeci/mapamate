import React from "react";
import GoogleMapDemo from "./GoogleMapDemo";
import "./App.css";
import SearchBar from "./SearchBar";
import StoreList from "./StoreList";
import stores from "../stores.json";


require('dotenv').config()

class App extends React.Component {
  state = { storeList: stores, selectedMarkerIndex: null };

  onFormSubmit = (location = "Amsterdam") => {

  };

  onStoreClick = (index) => {
    console.log(index);
    this.setState(() => ({ selectedMarkerIndex: index }));
  };

  render() {
    return (
      <div>
        <div className="title roboto-thin">Matemapa 🧉</div>
        {/* <SearchBar onFormSubmit={this.onFormSubmit} /> */}
        <GoogleMapDemo
          storeList={this.state.storeList}
          selectedMarkerIndex={this.state.selectedMarkerIndex}
        />
        <StoreList
          storeList={this.state.storeList}
          onStoreClick={this.onStoreClick}
        />
      </div>
    );
  }
}

export default App;
