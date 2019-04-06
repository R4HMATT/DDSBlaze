import React, { Component } from 'react';
import './ContactCard.css';
import ContactCardInfo from "./ContactCardInfo"

class ContactCard extends Component {

	constructor(props) {
    super(props);
    //let contacts = require('../ContactInfo.json');
    
    // List of all employees
    let employeeList = this.props.location.state.employeeList;

    // This employee's information
    let employee = {
        "id": this.props.location.state.id,
        "name": "",
        "title": "",
        "location": "",
        "phoneNumber": "",
        "email": "",
        "emergencyContact": ""
    };

    // Employee emergency contact information
    let emergencyContact = {
      "id": "",
      "name": "",
      "phoneNumber": "",
      "email": "",
    };

    // Find the current user by ID and fill in their info
    for(var i = 0; i < employeeList.length; i++){
      if(employeeList[i]["fields"]["id"] === employee["id"]){
        employee["location"] = employeeList[i]["fields"]["Work_x0020_Location_x0020_"];
        employee["name"] = employeeList[i]["fields"]["Title"] + " " + employeeList[i]["fields"]["Last_x0020_Name"];
        employee["email"] = employeeList[i]["fields"]["Personal_x0020_Email"];
        employee["phoneNumber"] = employeeList[i]["fields"]["_x0066_pv8"];
        employee["title"] = employeeList[i]["fields"][""];
        employee["emergencyContactID"] = employeeList[i]["fields"]["EmergencyContactID"].toString();
        break;
      }
    }

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
        <ContactCardInfo employeeInfo={this.state.employee} emergencyContactInfo={this.state.emergencyContact}/>
      </div>
    );
  }
}

export default ContactCard;
