import React, { Component } from 'react';
import './ContactCardInfo.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import { ListItemText, ListItemIcon } from '@material-ui/core';

class ContactCardInfo extends Component {

	constructor(props) {
    super(props);
    let contacts = require('../ContactInfo.json');
    let employee = {
        "id": this.props.user_id,
        "name": "",
        "title": "",
        "location": "",
        "phoneNumber": [],
        "email": [],
        "emergencyContact": ""
    };

    // Find the current user by ID and fill in their info
    for(var i = 0; i < contacts.length; i++){
      if(contacts[i]["B"] === this.props.user_id){
        employee["id"] = this.props.user_id;
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
      employee_id: this.props.user_id,
      primary_link: "/contactCard/" + this.props.user_id,
      value: "/contactCard/" + this.props.user_id
    };
}

	render() {
    let contactInformation = this.state.employee;
    let emergContact_link = "/contactCard/" + contactInformation["emergencyContact"]
    console.log("This state value: " + this.state.value);

    //     <div className="phoneInfo">
    //     <img src={require("./assets/phone_icon.png")}/>
    //     <h2>{contactInformation["phoneNumber"]}</h2>
    //   </div>

    //   <div className="emailInfo">
    //     <img src={require("./assets/info_icon.png")}/>
    //     <h2>{contactInformation["email"]}</h2>
    //   </div>

    //   <div className="locationInfo">
    //     <img src={require("./assets/location_icon.png")}/>
    //     <h2>{contactInformation["location"]}</h2>
    //   </div>
    return (
      <div className="ContactCardInfo">

        <div className="contactOverview">
          <img src={require("./assets/default_profile_pic.png")}/>
          <h2 className="employeeName">{contactInformation["name"]}</h2>
          <h3 className="employeeTitle"><i> {contactInformation["title"]} </i></h3>
        </div>
        <div className="detailedInfo">
            <List>
                <div className="phoneInfo">
                <ListItem button>
                    <ListItemIcon><img src={require("./assets/phone_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["phoneNumber"]}/>
                </ListItem>
                </div>

                <div className="emailInfo">
                <ListItem button>
                    <ListItemIcon><img src={require("./assets/email_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["email"]}/>
                </ListItem>
                </div>

                <div className="locationInfo">
                <ListItem button>
                    <ListItemIcon><img src={require("./assets/location_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["location"]}/>
                </ListItem>
                </div>
            </List>
        </div>
      </div>
    );
  }
}

export default ContactCardInfo;