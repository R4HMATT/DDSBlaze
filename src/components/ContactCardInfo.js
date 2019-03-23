import React, { Component } from 'react';
import './ContactCardInfo.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText, ListItemIcon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


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
      value: "/contactCard/" + this.props.user_id,
      modelIsOpen: false,
    };
  }

  handleModalOpen = () => {
    this.setState({modalIsOpen: true});
  }

  handleModalClose = () => {
    this.setState({modalIsOpen: false});
  }

	render() {
    let contactInformation = this.state.employee;
    //console.log("This state value: " + this.state.value);
    
    return (
      <div className="ContactCardInfo">
        <div className="contactOverview">
          <img src={require("./assets/default_profile_pic.png")}/>
          <h2 className="employeeName">{contactInformation["name"]}</h2>
          <h3 className="employeeTitle"><i> {contactInformation["title"]} </i></h3>
        </div>
        <div className="detailedInfo">

        <Paper>
            <List>
                <div className="phoneInfo">
                <a href={"tel:" + contactInformation["phoneNumber"]}>
                <ListItem button>
                    <ListItemIcon><img src={require("./assets/phone_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["phoneNumber"]}/>
                </ListItem>
                </a>
                </div>

                <div className="emailInfo">
                <a href={"mailto:" + contactInformation["email"]}>
                <ListItem button>
                    <ListItemIcon><img src={require("./assets/email_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["email"]}/>
                </ListItem>
                </a>
                </div>

                <div className="locationInfo">
                <ListItem button>
                    <ListItemIcon><img src={require("./assets/location_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["location"]}/>
                </ListItem>
                </div>
            </List>
        </Paper>
        </div>

        <Divider variant="middle"/>
        <div className="emergencyContactInfo">
          <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                Emergency Contact
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  <ListItem button alignItems="center" aria-label="Expand Emergency Contact" onClick={this.handleModalOpen}>
                    <Avatar>
                      <img src={require("./assets/default_profile_pic.png")}/>
                    </Avatar>
                    <ListItemText primary={this.props.emerg_contact_id} secondary="Click for details"/>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
          </ExpansionPanel>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.modalIsOpen} 
            onClose={this.handleModalClose}>
            <Paper className="emergencyContactModal" elevation="5">
              <Button 
                className="emergencyContactModalButton" 
                variant="contained" 
                size="small" 
                onClick={this.handleModalClose}>Close</Button>
            </Paper>
        </Modal>
        </div>
      </div>
    );
  }
}

export default ContactCardInfo;