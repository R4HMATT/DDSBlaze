import React, { Component } from 'react';
import './CheckedIn.css';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText, ListItemIcon, ListItemAvatar, ListItemSecondaryAction, IconButton } from '@material-ui/core';
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
	
	handleClick(){
		alert("clicked button");
	}

	render() {
		let new_url = "/contactCard/" + this.props.text;
		//<Link to={new_url}> {this.props.text} </Link>
	    return (

	      <div className="CheckedIn">
					<List>
							<ListItem button alignItems="center" onClick={this.handleClick}>
								<ListItemText primary={this.props.text}></ListItemText>

								<ListItemSecondaryAction>
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
									<Button className="btnCheckIn" variant="contained" color="primary" >Check In
									</Button>
								</ListItemSecondaryAction>

								<div className="buttons">
									

									

									{/* <button
										className="btnContactInfo"
										name="viewContactInfo"
										type="button"
										>
									</button> */}
									</div>
							</ListItem>
					</List>
	      </div>
	    );
	  }
}

export default CheckedIn;
