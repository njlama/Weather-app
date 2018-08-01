import React from 'react';
import {ReactCSSTransitionGroup} from 'react-addons-css-transition-group';

export default class Error extends React.Component{
    render(){
        return(
            <div className="errorBox">
               <p>Please enter valid city and country names</p>
            </div>
        );
    }
}