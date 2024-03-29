import React, { Component } from 'react';
import ContactCard from './ContactCard';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withSnackbar } from 'notistack';
import './ContactSummary.css';

function TransitionLeft(props){
  return <Slide direction="left" {...props}/>;
}

/**** This component is used to generate entries for indivdualds that are NOT checked in ****/

class ContactSummary extends Component {

	constructor(props) {
		super(props);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleContactCardOpen = this.handleContactCardOpen.bind(this);
		this.handleContactCardClose = this.handleContactCardClose.bind(this);
    this.state = {
			employee_id: this.props.employeeInfo["id"],
			employeeName: this.props.employeeInfo["name"],
			employeeStatus: this.props.employeeInfo["status"],
			employeePosition: this.props.employeeInfo["employeePosition"],
			contactCardOpen: false,
    };
	}

	handleContactCardOpen(){
		this.setState({contactCardOpen: true});
	}

	handleContactCardClose(){
		this.setState({contactCardOpen: false});
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			employee_id : nextProps.employeeInfo["id"],
			employeeName: nextProps.employeeInfo["name"],
			employeeStatus: nextProps.employeeInfo["status"],
			employeePosition: nextProps.employeeInfo["employeePosition"],
		})
	}

	handleButtonClick(){
		if(this.state.employeeStatus === "CheckedIn"){
			this.props.undoCheckIn(this.state.employee_id, this.state.employeeName);
		} else{
			this.props.checkIn(this.state.employee_id, this.state.employeeName);
		}
	}

	render() {
		const employeeName = this.state.employeeName;
		const employeeStatus = this.state.employeeStatus;
		const employeePosition = this.state.employeePosition;
	    return (

	      <div className="ContactSummary">
					<List disablePadding>
						<ListItem button alignItems="center" onClick={this.handleContactCardOpen}>
								<ListItemText>
									<div className="userName">
										{employeeName}
									</div>
									<div className="userPosition">
										{employeePosition}
									</div>
								</ListItemText>

								<ListItemSecondaryAction>
									<Button className={employeeStatus === "CheckedIn" ? "btnUndoCheckIn" : "btnCheckIn"}
									onClick={this.handleButtonClick}
									variant="contained" 
									color="primary">
										{employeeStatus === "CheckedIn" ? "Undo" : "Check In"}
									</Button>
								</ListItemSecondaryAction>
						</ListItem>
					</List>

					<Dialog fullScreen open={this.state.contactCardOpen} onClose={this.handleContactCardClose} TransitionComponent={TransitionLeft} scroll="paper">
						<div>
							<ContactCard employeeList={this.props.employeeList} employeeInfo={this.props.employeeInfo} closeDialog={this.handleContactCardClose}/>
						</div>
					</Dialog>
	      </div>
	    );
	  }
}

export default withSnackbar(ContactSummary);
