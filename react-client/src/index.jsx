import React from 'react';
import ReactDOM from 'react-dom';
import Results from './components/results.jsx';
const axios = require('axios');
const API_KEY = require('../../API_KEY.js');
const Promise = require('bluebird');
const googleMapsClient = require('@google/maps').createClient({
  key: API_KEY.API_KEY,
  Promise: Promise
});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasControllers: true,
      timeFrame: 1,
      location: {lat:37.4224082, lng: -122.0856086},
      locationName: "",
      permanentLocationName:"",
      listings: [],
    }
  }

  // componentDidMount() {
  //   if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((data) => {
  //       console.log(data);
  //       let coordinates  = {
  //         lat : data.coords.latitude,
  //         lng : data.coords.longitude
  //       };
  //       console.log('as;dflk')
  //       let reverseCode = Promise.promisify(googleMapsClient.reverseGeocode);
  //     });
  //   }
  // }
  enterLoc(e) {
    googleMapsClient.geocode({ address: this.state.locationName })
      .asPromise()
      .then(response => {
        if(response.json.results.length >= 1) {
          this.setState({location: response.json.results[0].geometry.location,
            permanentLocationName: this.state.locationName});
        }
      })
        .then(() => {
          axios.get('http:localhost:3000/listings', {params: {
            location: this.state.location
          }})
            .then(response => {
              this.setState({listings: response.data});
              console.log(response.data);
            })
        })
      .catch(e => {
        console.log(e);
      })
    e.preventDefault();
  };

  changeForm(e) {
    this.setState({locationName: e.target.value});
    e.preventDefault();
  }

  render () {
    return (
    <div className = "appContainer">
        <form onSubmit={this.enterLoc.bind(this)}>
          <label>
            Location:
          <input type="text" value = {this.state.locationName} onChange={this.changeForm.bind(this)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      <Results locationName = {this.state.permanentLocationName} listings={this.state.listings}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));