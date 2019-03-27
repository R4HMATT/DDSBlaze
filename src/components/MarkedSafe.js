import React, { Component } from 'react';
import './MarkedSafe.css';
import Button from '@material-ui/core/Button';
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
		      <div className="MarkedSafe" elevation={0.5}>
					<div className="userName">
						<Link to={new_url}> {this.props.text} </Link>
					</div>
		        <div className="buttons">
		        <Button 
		         	className="btnUndoCheckIn" 
		         	name="UndoCheckIn" 
							variant="contained"
							color="primary"
		         	onClick={this.props.deleteMethod}>  Undo  
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
			         	<Link to="/hello"></Link>
			     		</button> */}
			     </div>
		      </div>
	    );
	  }
}

export default MarkedSafe;
