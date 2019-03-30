import React, { Component } from 'react';
import './CheckedIn.css';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import {ListItemText} from '@material-ui/core';
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
		
	    return (

	      <div className="CheckedIn">
					<div className="userName">
					<Link to={new_url}>
							<ListItem button alignItems="center">
								<Avatar>
                  <img className="userProfilePic" src={require("./assets/default_profile_pic.png")}/>
                </Avatar>
								<ListItemText primary={this.props.text}></ListItemText>
							</ListItem>
					</Link>
					</div>
					<div className="buttons">

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

					<Button className="btnCheckIn" variant="contained" color="primary" >Check In</Button>

					</div>
	      </div>
	    );
	  }
}

export default CheckedIn;
