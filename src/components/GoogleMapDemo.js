import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import "./GoogleMap.css";

const styles = [
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#aee2e0"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#abce83"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#769E72"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#7B8758"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#EBF4A4"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#8dab68"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#5B5B3F"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ABCE83"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#A4C67D"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#9BBF72"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#EBF4A4"
          }
      ]
  },
  {
      "featureType": "transit",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#87ae79"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#7f2200"
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "visibility": "on"
          },
          {
              "weight": 4.1
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#495421"
          }
      ]
  },
  {
      "featureType": "administrative.neighborhood",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
];

let markerObjects = [];

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  isEqual = (a, b) => {
    if (a.length !== b.length) return "False";
    else {
      // comapring each element of array
      for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return "False";
      return "True";
    }
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (!this.isEqual(prevProps.storeList, this.props.storeList)) {
      this.setState(() => ({
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      }));
    }

    if (prevProps.selectedMarkerIndex !== this.props.selectedMarkerIndex) {
      if (markerObjects.length > 0 && this.props.selectedMarkerIndex) {
        let markers = markerObjects;

        new this.props.google.maps.event.trigger(
          markers[this.props.selectedMarkerIndex - 1].marker,
          "click"
        );
      }
    }
  }

  onMarkerMounted = (element) => {
    markerObjects.push(element);
  };

  getMarkers = () => {
    const markers = this.props.storeList.map((store, index) => {
      return (
        <Marker
          id={index}
          ref={this.onMarkerMounted}
          onClick={this.onMarkerClick}
          position={{
            lat: store.coordinates.latitude,
            lng: store.coordinates.longitude,
          }}
          // icon={{
          //   url: './mate.png',
          // }}
          key={store.id}
          name={store.name}
          site={store.site}
          address={store.location.address1}
          index={index + 1}
          rating={store.rating}
        />
      );
    });
    return markers;
  };

  getMapBounds = (stores) => {
    let bounds = new this.props.google.maps.LatLngBounds();
    for (let index = 0; index < this.props.storeList.length; index++) {
      bounds.extend({
        lat: this.props.storeList[index].coordinates.latitude,
        lng: this.props.storeList[index].coordinates.longitude,
      });
    }
    return bounds;
  };

 
 _mapLoaded(mapProps, map) {
    map.setOptions({
       styles: styles
    })
 }

  render() {
    return (
      <Map
        google={this.props.google}
        defaultZoom={8}
        options={this.createMapOptions}
        defaultCenter={{
          lat: 52.378711410477365,
          lng: 4.883293797906577,
        }}
        onClick={this.onMapClicked}
        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
        bounds={this.getMapBounds()}
      >
        {this.getMarkers()}
        <InfoWindow
          position={this.state.selectedPlace.position}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div id="info-window" className="store-info-window">
            <div className="store-info-name">
              {this.state.selectedPlace.name}
            </div>
            <div className="store-info-address">
              <div className="icon">
                <i className="fas fa-location-arrow"></i>
              </div>
              <span> {this.state.selectedPlace.address}</span>
            </div>
            <div className="store-info-phone">
              <div className="icon">
                <i className="fas fa-link"></i>
              </div>
              <div className="roboto-light store-phone-number">
            <a href={this.state.selectedPlace.site}>{this.state.selectedPlace.site}</a>
          </div>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY,
})(MapContainer);
