import React, { Component } from 'react';
import './MarkedSafe.css';
import ContactCard from './ContactCard.js';
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
	    	<Router>
		      <div className="MarkedSafe">
					<div className="userName">
						<Link to={new_url}> {this.props.text} </Link>
					</div>
		        <div className="buttons">
		        <button 
		         	className="btnUndoCheckIn" 
		         	name="UndoCheckIn" 
		         	type="button" 
		         	onClick={this.props.deleteMethod}>  Undo  
		         </button>

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
		    </Router>
	    );
	  }
}

export default MarkedSafe;
