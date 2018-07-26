import React from 'react';
import {
    Grid, Col, Row
    } from 'react-bootstrap';
/**
 * importing component
 */
import CurrentTemp from './CurrentTemp';
import WeekForeCast from './WeekForecast';
import HourlyForecast from './HourlyForecast';

/**
 * importing images
 */
import sunny from './wIcons/sunny.png';
import lightening from './wIcons/lightening.png';
import rain from './wIcons/rain.png';
import snow from './wIcons/snow.png';
import partiallyCloudy from './wIcons/partiallyCloudy.png';

export default class Maincontainer extends React.Component{


     getCondition = (param) => {
            switch (param){
                case "Clear":
                    return <img src={sunny} alt="sunny"/>;
                           
                case "Clouds" || "Haze":
                    return <img src={partiallyCloudy} alt="partially Cloudy"/>;
    
                case "Thunderstorm":
                    return <img src={lightening} alt="sunny"/>;
    
                case "Rain":
                    return <img src={rain} alt="rain"/>;                 
                
                case "Snow":
                    return <img src={snow} alt="snow"/>; 
                default: 
                    return null;  
            }
          
        }
    render(){
        
        return(
            <Grid>
                <Row className="show-grid currentWeather">
                    <Col xs={12} md={8}>
                    
                        <CurrentTemp 
                            city={this.props.city}
                            temp={this.props.temp}
                            description={this.props.description}
                            country={this.props.country}
                            date={this.props.date}
                            getCondition={this.getCondition.bind(this)}/>      
                    </Col>
                
                    <Col xs={12} md={4}>
                        <div className="secondDiv">
                            <div>
                                <div className="description">{this.props.description}</div>
                                <div className="weatherNow">
                                    <span>Now</span>
                                    <span>{Math.round(this.props.temp)}&deg;</span>
                                </div>
                            </div>
                            <HourlyForecast hourlyData={this.props.hourlyForecast}/>
                        </div>
                    </Col>
                
                    <Col xs={12} className="weekForecast">
                        <WeekForeCast weeklyForecast={this.props.weeklyForecast}
                                      getCondition={this.getCondition.bind(this)}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}