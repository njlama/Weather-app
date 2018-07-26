import React from 'react';
import {
    Grid
    } from 'react-bootstrap';
import axios from 'axios';
import MainContainer from './MainContainer';

export default class FindWeather extends React.Component{
    state={
        cityInput: "",
        countryInput:"",
        city: "",
        country: "",
        description:"",
        temp:null,
        date:null,
        mWeeklyForecast:[], 
        display: false, 

    }

    getWeatherData = () => {
        if (this.state.cityInput !== "" && this.state.countryInput !== ""){
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=`+ this.state.cityInput + `,`+ this.state.countryInput + `&appid=78adafca4ab9951329a9eeaf1f870715&units=metric`)
             .then(response => {
                 this.setState({
                     city: response.data.name,
                     country: response.data.sys.country,
                     description: response.data.weather[0].main,
                     temp: this.props.changeToFahren(response.data.main.temp),
                     date: response.data.dt
                 })
             })
             .then(data => {
                 axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=`+ this.state.city + `,`+ this.state.country + `&appid=78adafca4ab9951329a9eeaf1f870715&units=metric`)
                     .then(mResponse => {
                         let week = [];
                         for(let i=0; i < mResponse.data.list.length; i++){
                             let eachDayData = {};
                             eachDayData.day = this.props.getDay(mResponse.data.list[i].dt);
                             eachDayData.time = mResponse.data.list[i].dt;
                             eachDayData.description = mResponse.data.list[i].weather[0].main;
                             eachDayData.temp = this.props.changeToFahren(mResponse.data.list[i].main.temp);
                             eachDayData.minTemp = this.props.changeToFahren(mResponse.data.list[i].main.temp_min);
                             eachDayData.maxTemp = this.props.changeToFahren(mResponse.data.list[i].main.temp_max);
                 
                             week.push(eachDayData);   
                         }
                         this.setState({
                             mWeeklyForecast : week,
                             display: true
                         })
                         this.cityInput.value = "";
                         this.countryInput.value = "";
                     })
                     localStorage.setItem("city", this.state.city);
                     localStorage.setItem("country", this.state.country);
                    
             }) 
             .catch(error => {console.log(error);});         
        }  
        else {
            let cityLocalStorage = localStorage.getItem("city");
            let countryLocalStorage = localStorage.getItem("country");
            if (cityLocalStorage !== "" && countryLocalStorage !== ""){
                axios.get(`http://api.openweathermap.org/data/2.5/weather?q=`+ cityLocalStorage + `,`+ countryLocalStorage + `&appid=78adafca4ab9951329a9eeaf1f870715&units=metric`)
                .then(response => {
                    this.setState({
                        city: response.data.name,
                        country: response.data.sys.country,
                        description: response.data.weather[0].main,
                        temp: this.props.changeToFahren(response.data.main.temp),
                        date: response.data.dt
                    })
                })
                .then(data => {
                    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=`+ cityLocalStorage + `,`+ countryLocalStorage + `&appid=78adafca4ab9951329a9eeaf1f870715&units=metric`)
                    .then(mResponse => {
                        let week = [];
                        for(let i=0; i < mResponse.data.list.length; i++){
                            let eachDayData = {};
                            eachDayData.day = this.props.getDay(mResponse.data.list[i].dt);
                            eachDayData.time = mResponse.data.list[i].dt;
                            eachDayData.description = mResponse.data.list[i].weather[0].main;
                            eachDayData.temp = this.props.changeToFahren(mResponse.data.list[i].main.temp);
                            eachDayData.minTemp = this.props.changeToFahren(mResponse.data.list[i].main.temp_min);
                            eachDayData.maxTemp = this.props.changeToFahren(mResponse.data.list[i].main.temp_max);
                
                            week.push(eachDayData);   
                        }
                        this.setState({
                            mWeeklyForecast : week,
                            display: true
                        })
                    })
                    
                })
                .catch(error => {console.log(error);});      
            }
                      
        }  
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        this.getWeatherData();  
    }

    componentWillMount(){
         if(localStorage.getItem("city") !== null && localStorage.getItem("country") !== null){
            if (localStorage.getItem("city") !== "" && localStorage.getItem("country") !== ""){
                this.getWeatherData();
            } 
        }
    }

    changeHandler = () => {
        this.setState({
            cityInput: this.cityInput.value,
            countryInput: this.countryInput.value
        })
    }
    render(){
        return(
            <Grid className="main-divFindWeather">
                <form className="getWeatherForm" onSubmit={this.handleSubmit.bind(this)}>
                    <input className="cityInput" type="text" placeholder="City Name" ref={(input)=>this.cityInput = input} onChange={this.changeHandler.bind(this)}/>
                    <input className="countryInput" type="text" placeholder="Country Name" ref={(input)=>this.countryInput = input} onChange={this.changeHandler.bind(this)}/>
                    <button type="submit">Get Weather</button>
                </form>
                {this.state.display 
                ? 
                <MainContainer city={this.state.city}
                                country={this.state.country}
                                temp={this.state.temp}
                                description={this.state.description} 
                                date={this.state.date}
                                hourlyForecast={this.state.mWeeklyForecast}
                                weeklyForecast={this.state.mWeeklyForecast}/>
                : null}
            </Grid>
        );
    }
}
