import React, { Component } from 'react';
import ContactCardInfo from "./ContactCardInfo"
import './ContactCard.css';

class ContactCard extends Component {

	constructor(props) {
    super(props);
    //let contacts = require('../ContactInfo.json');
    
    // List of all employees
    let employeeList = this.props.employeeList;
    let employeeInfo = this.props.employeeInfo;

    // This employee's information
    let employee = {
        "id": employeeInfo["id"],
        "name": employeeInfo["name"],
        "title": employeeInfo["employeePosition"],
        "location": employeeInfo["employeeLocation"],
        "phoneNumber": employeeInfo["employeePhoneNumber"],
        "email": employeeInfo["employeeEmail"],
        "emergencyContactID": employeeInfo["emergencyContactID"],
    };

    // Employee emergency contact information
    let emergencyContact = {
      "id": "",
      "name": "",
      "phoneNumber": "",
      "email": "",
    };

    //Find emergency contact information and fill it in
    for(var i = 0; i < employeeList.length; i++){
      if(employeeList[i]["fields"]["id"] === employee["emergencyContactID"]){
        emergencyContact["name"] = employeeList[i]["fields"]["Title"] + " " + employeeList[i]["fields"]["Last_x0020_Name"];
        emergencyContact["email"] = employeeList[i]["fields"]["Personal_x0020_Email"];
        emergencyContact["phoneNumber"] = employeeList[i]["fields"]["_x0066_pv8"];
        break;
      }
    }
    emergencyContact["id"] = employee["emergencyContactID"];

    this.state = {
      employee: employee,
      emergencyContact: emergencyContact,
    };
}

  handleTabClick(event, value){
    this.setState({value: value});
  }

	render() {
    let contactInformation = this.state.employee;
    return (
      <div className="ContactCard">
        <ContactCardInfo employeeInfo={this.state.employee} emergencyContactInfo={this.state.emergencyContact} closeDialog={this.props.closeDialog}/>
      </div>
    );
  }
}

export default ContactCard;
