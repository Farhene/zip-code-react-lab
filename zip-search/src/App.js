import React, { Component } from 'react';
import './App.css';


function City({city}) {
  //could I perhaps populate cities here? Maybe Ill do it in the App class
  if(city.length > 0){
    console.log("yes");
  }
  return (
  <div>
    <ul>
      <li>City name: {city}</li>
    </ul>
  </div>
  );
}

function ZipSearchField( {onZipChange /*, onZipSubmit*/}) {
  return (
    <div>
     <form style={{ display: "flex", margin: "50px"}} >
      <h3> Zip code:  </h3>
      <input
        onChange={onZipChange}
        type="text"
        placeholder = "Enter 5 digit Zipcode"
      />
      {/*
      <input 
        type="submit" 
        onSubmit={onZipSubmit} 
        className="btn btn-secondary"
      />
      */}
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
    //this.zipSubmit = this.zipSubmit.bind(this);
  }

  zipChanged(e) {
    //Make GET request for the zip resource
    // then, when you receive the result, store it in state
    this.setState({
      zipCode: e.target.value
    });

    if(e.target.value.length === 5){
      console.log(e.target.value);
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${e.target.value}`)
      .then(response => response.json)
      .then(result => {
            this.setState({
              'cities': result
            });
          //console.log("finished loading cities");
          //console.log(result); 
          //shows I got the json file which is put into the cities array
        },
        
      )
       .catch( err => {
         console.log(`Failed: ${err}`)
      })
    }
    
  }

  /*
  zipSubmit(e) {
    alert('You pressed submit for: ' + this.state.zipCode);
    e.preventDefault();
    if(this.state.zipCode.length === 5){
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + this.state.zipCode)
      .then(response => response.json)
      .then(result => {
          this.setState({
            cities: result
          })
        }
      )
      .catch( err => {
        console.log(`Failed: ${err}`)
      })
    }
    return;
  }
  */

  render() {
    // here I can populate cities into an array
    //the cities doesnt seem to be fetching properly
   // console.log(this.state.cities.length + " Length of city array");
    const cities_ = this.state.cities;
    var city_array = [];

    for(var i = 0; i < cities_.length; i++){
      var index = cities_[i];
      city_array.push( <City city={index["City"]} /> );
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
            //onZipSubmit={ (e) => this.zipSubmit(e) }
          />
        </div>
        <div style={zipStyle}>
          <h5> The Cities in the Following Zipcode are: </h5>
        </div>
        <div>
          <City city={this.state.cities} />
            {/* 
              city_array.length === 0 
              ? <div style={zipStyle}> No cities found </div>
              : <div style={zipStyle}> city_array </div>
            */}        
        </div>
      </div>
    );
  }
}

export default App;