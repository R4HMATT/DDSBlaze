import React, { Component } from 'react';
import './ContactSummary.css';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

/**** This component is used to generate entries for indivdualds that are NOT checked in ****/

class ContactSummary extends Component {

	constructor(props) {
		super(props);
		this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
			employeeName: this.props.employeeInfo["name"],
			employeeStatus: this.props.employeeInfo["status"],
			employeePosition: this.props.employeeInfo["employeePosition"],
    };
	}

	handleButtonClick(){
		if(this.state.employeeStatus === "CheckedIn"){
			alert("Checked-out: " + this.state.employeeName);
		} else{
			alert("Checked-in: " + this.state.employeeName);
		}
	}

	render() {
		let new_url = "/contactCard/" + this.state.employeeName;
		const employeeName = this.state.employeeName;
		const employeeStatus = this.state.employeeStatus;
		const employeePosition = this.state.employeePosition;
	    return (

	      <div className="ContactSummary">
					<div className="employeeInfo">
					<Link to={{
							pathname: new_url,
							state: {
								employeeList: this.props.employeeList,
								employeeInfo: this.props.employeeInfo,
							}
						}}>
							<ListItem button alignItems="center">
								<div className="userName">
									{employeeName}
									<ListItemText secondary={employeePosition}/>
								</div>
							</ListItem>
					</Link>
					</div>
					<div className="buttons">
						{/* <div className="call-sms">
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
						</div> */}
					<Button className={employeeStatus === "CheckedIn" ? "btnUndoCheckIn" : "btnCheckIn"}
					onClick={this.handleButtonClick}
					variant="contained" 
					color="primary">
						{employeeStatus === "CheckedIn" ? "Undo" : "Check In"}
					</Button>

					</div>
	      </div>
	    );
	  }
}

export default ContactSummary;
