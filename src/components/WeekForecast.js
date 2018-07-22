import React from 'react';
import WeekDay from './WeekDay';


export default class WeekForecast extends React.Component {

    state = {
        weekDaysFilteredData: [] 
    }

    render(){
        let mEachDay = {};
        let weeklyForecast = this.props.weeklyForecast;

        for(let i = 0; i < weeklyForecast.length; i++){
       
            if(this.state.weekDaysFilteredData.length === 0){
                this.state.weekDaysFilteredData.push(weeklyForecast[i]); 
                mEachDay = weeklyForecast[i];  
            } else {
                  if(weeklyForecast[i].day !== mEachDay.day && this.state.weekDaysFilteredData.length <6) {
                   this.state.weekDaysFilteredData.push(weeklyForecast[i]);
                   mEachDay = weeklyForecast[i];
                  }
            }
        }

        let weekDays = this.state.weekDaysFilteredData.map((eachDay, index)=>{
            return <WeekDay key={index} discription={eachDay.description}
                            day={eachDay.day}
                            minTemp={eachDay.minTemp}
                            maxTemp={eachDay.maxTemp}
                            getCondition={this.props.getCondition.bind(this)}/>
        })
      
        return(
            <div className="flex-container">
                {weekDays}
            </div>
        );
    }
}

        
