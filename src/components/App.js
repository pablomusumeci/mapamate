import React from "react";
import GoogleMapDemo from "./GoogleMapDemo";
import "./App.css";
import StoreList from "./StoreList";
import stores from "../stores.json";


require('dotenv').config()

class App extends React.Component {
  state = { storeList: stores, selectedMarkerIndex: null };

  onStoreClick = (index) => {
    this.setState(() => ({ selectedMarkerIndex: index }));
  };

  render() {
    return (
      <div>
        <div className="title roboto-thin">Mapamate 🧉</div>
        <div className="subtitle roboto-thin">Missing store? Add it <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1bOF7Mb7Myfc83hDD2zRVAFnWzedSXzddFlqGxjDfApQ/edit?usp=sharing">here</a>! </div>
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
