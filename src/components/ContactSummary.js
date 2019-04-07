import React, { Component } from 'react';
import ContactCard from './ContactCard';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withSnackbar } from 'notistack';
import './ContactSummary.css';

/**** This component is used to generate entries for indivdualds that are NOT checked in ****/

class ContactSummary extends Component {

	constructor(props) {
		super(props);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleContactCardOpen = this.handleContactCardOpen.bind(this);
		this.handleContactCardClose = this.handleContactCardClose.bind(this);
    this.state = {
			employeeName: this.props.employeeInfo["name"],
			employeeStatus: this.props.employeeInfo["status"],
			employeePosition: this.props.employeeInfo["employeePosition"],
			contatCardOpen: false,
    };
	}

	handleButtonClick(){
		let message=["Checked In: ", "Checked-Out: "];
		let timeout = 3000;

		if(this.state.employeeStatus === "CheckedIn"){
			this.props.enqueueSnackbar(message[1] + this.state.employeeName, {
				variant: "warning",
				autoHideDuration: timeout,
				action: (
					<Button size="small" variant="outlined" color="inherit">Undo</Button>
				),
			});
		} else{
			this.props.enqueueSnackbar(message[0] + this.state.employeeName, {
				variant: "success",
				autoHideDuration: timeout,
				action: (
					<Button size="small" variant="outlined" color="inherit">Undo</Button>
				),
			});
		}
	}

	handleContactCardOpen(){
		this.setState({contatCardOpen: true});
	}

	handleContactCardClose(){
		this.setState({contatCardOpen: false});
	}

	render() {
		let new_url = "/contactCard/" + this.state.employeeName;
		const employeeName = this.state.employeeName;
		const employeeStatus = this.state.employeeStatus;
		const employeePosition = this.state.employeePosition;
	    return (

	      <div className="ContactSummary">
					<div className="employeeInfo">
					{/* <Link to={{
							pathname: new_url,
							state: {
								employeeList: this.props.employeeList,
								employeeInfo: this.props.employeeInfo,
							}
						}}> */}
							<ListItem button alignItems="center" onClick={this.handleContactCardOpen}>
								<div className="userName">
									{employeeName}
									<ListItemText secondary={employeePosition}/>
								</div>
							</ListItem>
					{/* </Link> */}
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
					<Dialog fullScreen open={this.state.contatCardOpen} onClose={this.handleContactCardClose} scroll="paper">
						<div>
							<ContactCard employeeList={this.props.employeeList} employeeInfo={this.props.employeeInfo} closeDialog={this.handleContactCardClose}/>
						</div>
					</Dialog>
	      </div>
	    );
	  }
}

export default withSnackbar(ContactSummary);
