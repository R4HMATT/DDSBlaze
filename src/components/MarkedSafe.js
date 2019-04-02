import React, { Component } from 'react';
import './MarkedSafe.css';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

/**** This component is used to generate entries for individuals that ARE checked in ****/

class MarkedSafe extends Component {

	constructor(props) {
    super(props);

    this.state = {
    };
  }

	render() {
		let new_url = "/contactCard/" + this.props.text;
	    return (
				<div className="MarkedSafe">
				<div className="employeeInfo">
				<Link to={new_url}>
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
				<Button className="btnUndoCheckIn" name="UndoCheckIn" variant="contained" color="primary" >Undo</Button>

				</div>
			</div>
	    );
	  }
}

export default MarkedSafe;
