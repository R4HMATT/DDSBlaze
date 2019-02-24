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

class MarkedSafe extends Component {

	constructor(props) {
    super(props);

    this.state = {
    };
  }

	render() {
	    return (
	    	<Router>
		      <div className="MarkedSafe">
		        {this.props.text}
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
						 
						 <button
			         	className="btnContactInfo"
			         	name="viewContactInfo"
			         	type="button"
								 >
			         	<Link to="/hello"></Link>
			     		</button>

					 

			    <Route path="/hello" component={ContactCard}/>
			     </div>
		      </div>
		    </Router>
	    );
	  }
}

export default MarkedSafe;
