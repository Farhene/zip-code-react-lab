import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
  <div className="card mb-4">
      <div style={{margin: "10px" }} className="background card-header">
        City name: {props.city}
      </div>
      <ul className="">
        <li>State name: {props.state} </li>
        <li>Record Number: {props.record} </li>
        <li>Estimated Population: {props.pop}</li>
        <li>Tax Returns Filed: {props.tax}</li>
        <li>Total Wages: {props.wages}</li>
        <li>Notes: {props.notes}</li>
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
        pattern="[0-9]{5}"
        //maxLength="5"
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

    else if(zip.length < 5 || zip.length > 5){
      this.setState({
        cities: []
      });
    }

    this.setState({
      zipCode: zip
    }); //we could use callback function here to ensure updated value

  }

  render() {
    // here I can populate cities into an array
    //the cities doesnt seem to be fetching properly    
    var city_array = [];
    const zip = this.state.zipCode;

    for(var i = 0; i < this.state.cities.length; i++){
      city_array.push( 
        <City 
          city={this.state.cities[i]["City"]} 
          state={this.state.cities[i]["State"]}
          record={this.state.cities[i]["RecordNumber"]}
          notes={this.state.cities[i]["Notes"]}
          tax={this.state.cities[i]["TaxReturnsFiled"]}
          pop={this.state.cities[i]["EstimatedPopulation"]}
          wages={this.state.cities[i]["TotalWages"]}
        /> 
      );
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
              : <div style={zipStyle, {display: "flex"}}> {city_array} </div>
            }        
        </div>
      </div>
    );
  }
}

export default App;