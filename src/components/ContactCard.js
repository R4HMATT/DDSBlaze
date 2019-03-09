import React, { Component } from 'react';
import './ContactCard.css';
import EmergencyContactsNavBar from "./EmergencyContactsNavBar"

class ContactCard extends Component {

	constructor(props) {
    super(props);
    let contacts = require('../ContactInfo.json');
    let employee = {
        "id": this.props.match.params.id,
        "name": "",
        "title": "",
        "location": "",
        "phoneNumber": [],
        "email": [],
        "emergencyContact": ""
    };

    // Find the current user by ID and fill in their info
    for(var i = 0; i < contacts.length; i++){
      if(contacts[i]["B"] === this.props.match.params.id){
        employee["id"] = this.props.match.params.id;
        employee["location"] = contacts[i]["A"];
        employee["name"] = contacts[i]["B"];
        employee["email"] = contacts[i]["C"];
        employee["phoneNumber"] = contacts[i]["D"];
        employee["title"] = contacts[i]["K"];
        employee["emergencyContact"] = contacts[i]["E"];
        break;
      }
    }

    this.state = {
      employee: employee,
      employee_id: this.props.match.params.id,
      primary_link: "/contactCard/" + this.props.match.params.id,
      value: "/contactCard/" + this.props.match.params.id
    };
}

  handleTabClick(event, value){
    this.setState({value: value});
  }

	render() {
    let contactInformation = this.state.employee;

    return (
      <div className="ContactCard">
        <EmergencyContactsNavBar user_id={this.props.match.params.id} emerg_contact_id={this.state.employee["emergencyContact"]}/>
      </div>
    );
  }
}

export default ContactCard;
