import React, { Component } from 'react';
import './CheckedIn.css';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

/**** This component is used to generate entries for indivdualds that are NOT checked in ****/

class CheckedIn extends Component {

	constructor(props) {
    super(props);
    this.state = {
    };
  }

	render() {
		let new_url = "/contactCard/" + this.props.text;
	    return (

	      <div className="CheckedIn">
	        <div className="userName">
	        	<Link to={new_url}> {this.props.text} </Link>
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
