import React from 'react';


export default class WeekDay extends React.Component {

    state = {
        weekDaysName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"], 
    }

    render(){
        let dayName = this.state.weekDaysName[this.props.day];

        return(
            <div>
                
                <div>{dayName}</div>
                <div className="imgSizeDown">{this.props.getCondition(this.props.discription)}</div>
                <div><span>{this.props.maxTemp}&deg; / {this.props.minTemp}&deg;</span></div>
                
            </div>
        );
    }
}


