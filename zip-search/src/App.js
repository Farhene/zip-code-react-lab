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

function ZipSearchField( {onZipChange , onZipSubmit}) {
  return (
    <div>
     <form style={{ display: "flex", margin: "50px"}} >
      <h3> Zip code:  </h3>
      <input
        onChange={onZipChange}
        type="text"
        placeholder = "Enter 5 digit Zipcode"
      />
      <input 
        type="submit" 
        onSubmit={onZipSubmit} 
        className="btn btn-secondary"
      />
    </form>
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: "",
      cities: [],
    }

    this.zipChanged = this.zipChanged.bind(this);
    this.zipSubmit = this.zipSubmit.bind(this);
  }

  zipChanged(e) {
    //Make GET request for the zip resource
    // then, when you receive the result, store it in state
    this.setState({
      zipCode: e.target.value
    });

    console.log(this.state.zipCode);
  }

  zipSubmit(e) {
    alert('You pressed submit for: ' + this.state.zipCode);
    e.preventDefault();
    if(this.state.zipCode.length === 5){
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
      //console.log(cities_[i]);
      city_array.push( <City city={cities_[i]["City"]} /> )
    }
    
    const zipStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div style={zipStyle}>
          <ZipSearchField 
            onZipChange={ (e) => this.zipChanged(e)} 
            onZipSubmit={ (e) => this.zipSubmit(e) }
          />
        </div>
        <div style={zipStyle}>
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