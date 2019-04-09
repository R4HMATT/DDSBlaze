import React, { Component } from 'react';
import './CheckedIn.css';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import updateStatus from '../spCalls';

/**** This component is used to generate en tries for indivdualds that are NOT checked in ****/

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
					<div className="employeeInfo">
					<Link to={{
							pathname: new_url,
							state: {
								employeeList: this.props.employeeList,
								id: this.props.id,
							}
						}}>
							<ListItem button alignItems="center">
								<div className="userName">
									{this.props.text}
								</div>
							</ListItem>
					</Link>
					</div>
					<div className="buttons">
						<div className="call-sms">
							<button className="btnContactPhone"
											name="viewContactPhone"
											type="button"
											href="tel:416-456-7890"
											/>
							
							<button className="btnContactSMS"
											name="viewContactSMS"
											type="button"
											href="sms:416-456-7890"
											/>
						</div>
					<Button className="btnCheckIn" onClick={() => updateStatus('CheckedIn', 1)} variant="contained" color="primary" >Check In</Button>

					</div>
	      </div>
	    );
	  }
}

export default CheckedIn;
