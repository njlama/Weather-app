import React from 'react';
import Timestamp from 'react-timestamp';
import './hourlyForecast.css';


export default class HourlyForecast extends React.Component {

    render(){
        let data = this.props.hourlyData.slice(0,6);

        let hourly = data.map((eachHour, index )=>{
               return <div className="rowFlexContainer" key={index}>
                        <div><Timestamp time={eachHour.time} format="time"/></div>
                        <div>{Math.round(eachHour.temp)}&deg;</div>
                    </div>
        }
    )
            
        return(
            <div className="hourlyFlexContainer">
               {hourly}
            </div>
        );

    }
}