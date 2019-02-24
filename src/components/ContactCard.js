import React, { Component } from 'react';
import './ContactCard.css';

class ContactCard extends Component {

	constructor(props) {
    super(props);
    let contacts = require('../ContactInfo.json');
    let emergContact = {
        "Name": [],
        "PhoneNumber": [],
        "email": []
    };
    for(var i = 0; i < contacts.length; i++){
    	emergContact["Name"][i] = contacts[i]["B"];
    	emergContact["PhoneNumber"][i] = contacts[i]["C"];
    	emergContact["email"][i] = contacts[i]["D"];
    }
    this.state = {
    	employee: emergContact
    };
}
    

	render() {
        let contactInformation = this.state.employee;
	    return (
	      <div className="ContactCard">
          <h2>{this.props.text}</h2>
          <h2>{contactInformation.PhoneNumber[0]}</h2>
          <h2>{contactInformation.email[0]}</h2>
	      </div>
	    );
	  }
}

export default ContactCard;
