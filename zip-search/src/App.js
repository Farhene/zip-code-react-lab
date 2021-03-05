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

function ZipSearchField( {onZipChange /*, onZipSubmit*/}) {
  return (
    <div style={{marginTop: "20px"}}>
     <form style={{display: "flex"}}>
      <h3> Zip code:  </h3>
      <input
        onChange={onZipChange}
        type="text"
        placeholder = "Enter 5 digit Zipcode"
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
    //this.zipSubmit = this.zipSubmit.bind(this);
  }

  zipChanged(e) {
    //Make GET request for the zip resource
    // then, when you receive the result, store it in state
    let zip = e.target.value;

    if(zip.length === 5){
      console.log(e.target.value);
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
      .then(response => response.json())
      .then(result => {
            this.setState({
              cities: result
            });
          console.log(result); 
        },
        
      )
       .catch( err => {
         console.log(`Failed: ${err}`)
      })
    }    

    this.setState({
      zipCode: zip
    }); //we could use callback function here to ensure updated value

  }

  render() {
    // here I can populate cities into an array
    //the cities doesnt seem to be fetching properly
    console.log(this.state.cities.length + " Length of city array");
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
          />
        </div>
        <div style={zipStyle}>
          <h5> The Cities in the Following Zipcode are: </h5>
        </div>
        <div>
            {
              city_array.length === 0 
              ? <div style={zipStyle}> No cities found </div>
              : <div style={zipStyle}> {city_array} </div>
            }        
        </div>
      </div>
    );
  }
}

export default App;