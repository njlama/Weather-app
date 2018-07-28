import React from 'react';
import {} from 'react-bootstrap';
import "../css/currentWeather.css";
	

import Timestamp from 'react-timestamp';

export default class CurrentTemp  extends React.Component{

        state = {
            weekDays : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        }
    render(){
        
        let date = new Date(this.props.date*1000);
        let day = date.getDay();
   
        let nameOfDay = this.state.weekDays[day];

        
        return(
            <div>
                <div className="currentCityCountry">
                    <span>{this.props.city} , {this.props.country}</span><br/>
                    <Timestamp time={this.props.date} format="date"/><br/>
                    {nameOfDay}, <Timestamp time={this.props.date} format="time"/><br/>
                </div>
                
                <div className="temp">
                    <div className="currentWeatherIcon">
                    {this.props.getCondition(this.props.description)}
                    </div> 
                    <div className="currentWeather">{Math.round(this.props.temp)}&deg;</div>
                </div>
                
            </div>
        );
    }
}