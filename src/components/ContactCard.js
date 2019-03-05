import React, { Component } from 'react';
import './ContactCard.css';

class ContactCard extends Component {

	constructor(props) {
    super(props);
    let contacts = require('../ContactInfo.json');
    let employee = {
        "id": "",
        "name": [],
        "phoneNumber": [],
        "email": []
    };

    // Find the current user by ID and fill in their info
    for(var i = 0; i < contacts.length; i++){
      if(contacts[i]["B"] === this.props.match.params.id){
        employee["id"] = this.props.match.params.id;
        employee["name"] = contacts[i]["B"];
        employee["email"] = contacts[i]["C"];
        employee["phoneNumber"] = contacts[i]["D"];
      }
    }

    this.state = {
      employee: employee,
      employee_id: this.props.match.params.id
    };
}

	render() {
    console.log(contactInformation);
        let contactInformation = this.state.employee;
	    return (
	      <div className="ContactCard">
          <h2>Employee ID: {this.state.employee_id}</h2>
          <h2>Employee Name: {contactInformation["name"]}</h2>
          <h2>Employee Number: {contactInformation["name"]}</h2>
          <h2>Employee Email: {contactInformation["email"]}</h2>
	      </div>
	    );
	  }
}

export default ContactCard;
