import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = { location: "Amsterdam" };

  handleLocationInputChange = (event) => {
    let location = event.target.value;
    this.setState(() => ({ location }));
  };
  onKeyUp = (e) => {
    if (e.key === "Enter") {
      this.props.onFormSubmit(this.state.location);
    }
  };

  render() {
    return (
      <div className="search-bar">
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              value={this.state.location}
              placeholder="Enter Location"
              id="location"
              onChange={this.handleLocationInputChange}
              onKeyUp={this.onKeyUp}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
