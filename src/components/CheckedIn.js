import React, { Component } from 'react';
import './CheckedIn.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import ContactCard from './ContactCard';

/**** This component is used to generate entries for indivdualds that are NOT checked in ****/

class CheckedIn extends Component {

	constructor(props) {
    super(props);
    this.state = {
    };
  }

	render() {
	    return (

	      <div className="CheckedIn">
	        <div className="userName">
	        	<Link to="/contactCard"> {this.props.text} </Link>
	        </div>
	        <div className="buttons">
		         <button 
		         	className="btnCheckIn" 
		         	name="isCheckedIn" 
		         	type="button"
		         	onClick={this.props.deleteMethod}>Check In
		         </button>

						 <button className="btnContactPhone"
						 name="viewContactPhone"
						 type="button"
						 />

						 <button className="btnContactSMS"
						 name="viewContactSMS"
						 type="button"
						 />

		         {/* <button
		         	className="btnContactInfo"
		         	name="viewContactInfo"
		         	type="button"
							 >
		         </button> */}
		    </div>

	      </div>
	    );
	  }
}

export default CheckedIn;
