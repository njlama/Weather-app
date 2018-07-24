import React from 'react';
import {
    Grid
    } from 'react-bootstrap';

export default class FindWeather extends React.Component{
    render(){
        return(
            <Grid>
            <div className="main-divFindWeather">
                <p>This app will help you find weather.</p>
                <div></div> 
            </div>
            </Grid>
        );
    }
}
