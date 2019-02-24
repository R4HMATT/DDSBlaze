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
		         	class="btnCheckIn" 
		         	name="isCheckedIn" 
		         	type="button"
		         	onClick={this.props.deleteMethod}>Check In
		         </button>

						 <button class="btnContactPhone"
						 name="viewContactPhone"
						 type="button"/>

						 <button class="btnContactSMS"
						 name="viewContactSMS"
						 type="button"/>

		         <button
		         	class="btnContactInfo"
		         	name="viewContactInfo"
		         	type="button">
		         </button>
		    </div>
	      </div>
	    );
	  }
}

export default CheckedIn;
