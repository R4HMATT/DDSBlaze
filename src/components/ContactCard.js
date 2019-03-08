import React, { Component } from 'react';
import './ContactCard.css';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EmergencyContact from "./EmergencyContact";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

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
      selectedTab: 0
    };
}

  handleTabClick(event, value){
    this.setState({value});
  }


	render() {
    let contactInformation = this.state.employee;

    // Primary and secondary contacts for this employee
    let primary_id = this.state.employee_id;
    let emergContact = this.state.employee["emergencyContact"];

    // A link for each emergency contact (including self)
    let primary_link = "/contactCard/" + primary_id;
    let emergContact_link = "/contactCard/" + emergContact;

    console.log(this.state.selectedTab);
    /* <div className="emergencyInfo">
          <div className="emergencyContact">
          Emergency Contact #1
          </div>
          <div className="emergencyContact">
          Emergency Contact #2
          </div>
          <div className="emergencyContact">
          Emergency Contact #3
          </div>
        </div>*/
    return (
      <div className="ContactCard">

        <div className="contactOverview">
          <img src={require("./assets/default_profile_pic.png")}/>
          <h2 className="employeeName">{contactInformation["name"]}</h2>
          <h3 className="employeeTitle"><i> {contactInformation["title"]} </i></h3>
        </div>

        <div className="detailedInfo">
          <div className="phoneInfo">
            <img src={require("./assets/phone_icon.png")}/>
            <h2>{contactInformation["phoneNumber"]}</h2>
          </div>

          <div className="emailInfo">
            <img src={require("./assets/info_icon.png")}/>
            <h2>{contactInformation["email"]}</h2>
          </div>

          <div className="locationInfo">
            <img src={require("./assets/location_icon.png")}/>
            <h2>{contactInformation["location"]}</h2>
          </div>
        </div>
        <div className="emergencyInfo">
        <AppBar position="static" color="default">
            <Tabs
            value={this.selectedTab}
            onChange={this.handleTabClick}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Primary" component={Link} to={primary_link}/>
              <Tab label="Emergency Contact: " component={Link} to={emergContact_link}/>
            </Tabs>
          </AppBar>
          </div>
      </div>
    );
  }
}

export default ContactCard;
