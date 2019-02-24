import React, { Component } from 'react';
import './CheckedIn.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class CheckedIn extends Component {

	constructor(props) {
    super(props);
    this.state = {
    };
  }

	render() {
	    return (

	      <div className="CheckedIn">
	        {this.props.text}
	        <div className="buttons">
		         <button 
		         	className="btnCheckIn" 
		         	name="isCheckedIn" 
		         	type="button"
		         	onClick={this.props.deleteMethod}>Check In
		         </button>

		         <button
		         	className="btnContactInfo"
		         	name="viewContactInfo"
		         	type="button">
		         </button>
		    </div>
	      </div>
	    );
	  }
}

export default CheckedIn;
