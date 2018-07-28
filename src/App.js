import React, { Component } from 'react';  
import MainContainer from './components/MainContainer';
import axios from 'axios';
import WeatherNavbar from "./components/WeatherNavbar";
import FindWeather from './components/FindWeather';
import {BrowserRouter, Route} from 'react-router-dom'


class App extends Component {

  state = {

    currentCity: "",
    currentCountry: "",
    currentDescription: "",
    currentTemp: null,
    currentDate: null,
    weeklyForecast: []
  }

  componentDidMount() {
    // let apiKey1 = "937d876d9dc631eef042ad55b2932b1b";
    let apiKey1 = "78adafca4ab9951329a9eeaf1f870715";
    // let apiKey2 = "7bf9a316b8bd44f473112322e71eaa14";
    // axios.get(`https://ipinfo.io/?token=c76ffa4c96e2d3`)
    axios.get(`https://api.ipdata.co/?api-key=8f68417a015e5178652664a61c326fe1c7b0d4990e9fa5f7e6416777`)
      .then(mResponse => {
      
        let city = mResponse.data.city;
        let country = mResponse.data.country_code;
        let cityCountry = [city, country];
        return cityCountry;

      })
      .then(value => {
        let mData = value;
         axios.get(`https://api.openweathermap.org/data/2.5/weather?q=`+ value[0] + `,`+ value[1] + `&appid=`+apiKey1+`&units=metric`)
        .then(response => {
          this.setState({
            currentCity: response.data.name,
            currentCountry: response.data.sys.country,
            currentDescription: response.data.weather[0].main,
            currentTemp: this.changeToFahren(response.data.main.temp),
            currentDate: response.data.dt
          })
         
        });
        return mData; 
      })
      .then(mData => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=`+ mData[0] + `,`+ mData[1] + `&appid=`+ apiKey1+`&units=metric`)
        .then(response => {     
          let week = [];
          for(let i=0; i < response.data.list.length; i++){
            let eachDayData = {};
            eachDayData.day = this.getDay(response.data.list[i].dt);
            eachDayData.time = response.data.list[i].dt;
            eachDayData.description = response.data.list[i].weather[0].main;
            eachDayData.temp = this.changeToFahren(response.data.list[i].main.temp);
            eachDayData.minTemp = this.changeToFahren(response.data.list[i].main.temp_min);
            eachDayData.maxTemp = this.changeToFahren(response.data.list[i].main.temp_max);
  
            week.push(eachDayData);   
          }
          this.setState({
            weeklyForecast : week
          })
        })
      }    
      )
      .catch(error => {console.log(error)});
        
  }
  changeToFahren = (temp) => Math.round(9/5 * parseFloat(temp) + 32);
  getDay = (date) =>  new Date(date*1000).getDay();

  render() {
    return (
    <BrowserRouter>
      <div className="app-container">
      <WeatherNavbar/>
        <Route exact path="/" render={()=> <MainContainer city={this.state.currentCity}
                                                    temp={this.state.currentTemp}
                                                    description={this.state.currentDescription}
                                                    country={this.state.currentCountry}
                                                    date={this.state.currentDate}
                                                    hourlyForecast={this.state.weeklyForecast}
                                                    weeklyForecast={this.state.weeklyForecast}/>}/>
        <Route path="/findweather" 
          render={()=> 
          <FindWeather changeToFahren={this.changeToFahren.bind(this)}
                        getDay={this.getDay.bind(this)}/>}/>
          
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
