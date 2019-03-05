import React, { Component } from 'react';
import './ContactCard.css';

class ContactCard extends Component {

	constructor(props) {
    super(props);
    let contacts = require('../ContactInfo.json');
    let employee = {
        "id": "",
        "name": "",
        "title": "",
        "location": "",
        "phoneNumber": [],
        "email": [],
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
      }
    }

    this.state = {
      employee: employee,
      employee_id: this.props.match.params.id
    };
}

	render() {
    let contactInformation = this.state.employee;
    return (
      <div className="ContactCard">

        <div className="contactOverview">
          <img src={require("./assets/default_profile_pic.png")} height="35%" width="35%"/>
          <h2 className="employeeName">{contactInformation["name"]}</h2>
          <h3 className="employeeTitle"><i> {contactInformation["title"]} </i></h3>
        </div>

        <div className="detailedInfo">
          <div className="phoneInfo">
            <h2>{contactInformation["phoneNumber"]}</h2>
          </div>

          <div className="emailInfo">
            <h2>{contactInformation["email"]}</h2>
          </div>

          <div className="locationInfo">
            <h2>{contactInformation["location"]}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactCard;
