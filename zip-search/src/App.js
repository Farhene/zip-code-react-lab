import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
  <div>
    <ul>
      <li>City name: {props.city}</li>
    </ul>
  </div>
  );
}

function ZipSearchField( {onZipChange}) {
  return (
    <div>
      <label>Zip Code: </label>
      <input 
        type = "text" 
        placeholder = "Enter 5 digit Zipcode"
        onChange={onZipChange} 
      />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }

  zipChanged(e) {
    //Make GET request for the zip resource
    // then, when you receive the result, store it in state
    if(e.target.value <= 5){
      this.setState({
        zipCode: e.target.value
      });

      fetch('http://ctp-zip-api.herokuapp.com/zip/' + this.state.zipCode)
        .then(response => response.json)
        .then(result => {
            console.log(result["City"]);
            this.setState({
              cities: result
            })
          }
        )
      }
  }

  render() {
    // here I can populate cities into a array
    const cities_ = this.state.cities
    var city_array = [];

    for(var i = 0; i < cities_.length; i++){
      console.log(cities_[i]);
      city_array.push( <City city={cities_[i]["City"]} /> )
    }
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onZipChange={ (e) => this.zipChanged(e)} />
        <div>
          <h5> The Cities in the Following Zipcode are: </h5>
        </div>
        <div>
            {city_array}        
        </div>
      </div>
    );
  }
}

export default App;