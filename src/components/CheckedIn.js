import React, { Component } from 'react';
import './CheckedIn.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
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
	        	<Link to={{
							pathname: new_url,
							state: {
								employeeList: this.props.employeeList,
								id: this.props.id,
							}
						}}> {this.props.text} </Link>
	        </div>
	        <div className="buttons">
		         <Button className="btnCheckIn" variant="contained" color="primary" >Check In
		         </Button>

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
