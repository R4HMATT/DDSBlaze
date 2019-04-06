import React, { Component } from 'react';
import './ContactSummary.css';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
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
			employeeName: this.props.text,
			employeeStatus: this.props.status,
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
		let new_url = "/contactCard/" + this.props.text;
		const employeeName = this.state.employeeName;
		const employeeStatus = this.state.employeeStatus;
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
									{employeeName}
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
