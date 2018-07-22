import React from 'react';
import {NavLink} from 'react-router-dom';

export default class WeatherNavbar extends React.Component{
    render(){
        return(
            <header>
                <ul className="main-nav">
                    <li><NavLink exact to="/" activeStyle={{background:'rgba(20, 13, 13, 0.1)'}}>Current Location</NavLink></li>
                    <li><NavLink to="/findweather" activeClassName="selected">Find Weather</NavLink></li>          
                </ul>
            </header>
        );
    }
}

