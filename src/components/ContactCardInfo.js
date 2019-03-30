import React, { Component } from 'react';
import './ContactCardInfo.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText, ListItemIcon, DialogContentText, ListItemAvatar, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CallIcon from '@material-ui/icons/Call'
import SMSIcon from '@material-ui/icons/Sms'


class ContactCardInfo extends Component {

	constructor(props) {
    super(props);
    let contacts = require('../ContactInfo.json');
    let employee = {
        "id": this.props.user_id,
        "name": "N/A",
        "title": "N/A",
        "location": "",
        "phoneNumber": "",
        "email": "",
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
      modalIsOpen: false,
    };
  }

  handleModalOpen = () => {
    this.setState({modalIsOpen: true});
  }

  handleModalClose = () => {
    this.setState({modalIsOpen: false});
  }
  
  handleBackButton(){
    window.history.back();
  }

	render() {
    let contactInformation = this.state.employee;
    //console.log("This state value: " + this.state.value);
    
    return (
      <div className="ContactCardInfo">
        <div className="contactOverview">
        <Button
          className="backButton" 
          variant="outlined" 
          onClick={this.handleBackButton}>
            {"Back"}
          </Button>
          <img src={require("./assets/default_profile_pic.png")}/>
          <h2 className="employeeName">{contactInformation["name"]}</h2>
          <h3 className="employeeTitle"><i> {contactInformation["title"]} </i></h3>
        </div>

        <div className="detailedInfo">
        <Paper>
            <List>
                <div className="phoneInfo">
                <ListItem button disabled={contactInformation["phoneNumber"] === ""} component="a" href={"tel:" + contactInformation["phoneNumber"]}>
                    <ListItemIcon><img src={require("./assets/phone_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["phoneNumber"]} secondary={contactInformation["phoneNumber"] === "" ? 'No Phone Number on Record' : "Tap to Call / Tap + Hold for SMS"}/>
                </ListItem>
                </div>

                <div className="emailInfo">
                <ListItem button disabled={contactInformation["email"] === ""} component="a" href={"mailto:" + contactInformation["email"]}>
                    <ListItemIcon><img src={require("./assets/email_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["email"]} secondary={contactInformation["email"] === "" ? 'No Email on Record' : 'Tap to Email'}/>
                </ListItem>
                </div>

                <div className="locationInfo">
                <ListItem button disabled={contactInformation["location"] === ""}>
                    <ListItemIcon><img src={require("./assets/location_icon.png")}/></ListItemIcon>
                    <ListItemText primary={contactInformation["location"]} secondary={contactInformation["location"] === "" ? 'No Location Info on Record' : ''}/>
                </ListItem>
                </div>
            </List>
        </Paper>
        </div>

        <Divider variant="middle"/>
        <div className="emergencyContactInfo">
          <Paper>
            <List>
              <ListItem button alignItems="center" aria-label="Emergency Contact Overview" disabled={this.props.emerg_contact_id === ''} onClick={this.handleModalOpen}>
                <Avatar>
                  <img className="emergencyContactProfilePic" src={require("./assets/default_profile_pic.png")}/>
                </Avatar>
                <ListItemText primary={this.props.emerg_contact_id} secondary={this.props.emerg_contact_id === '' ? 'No Emergency Contact on Record' : 'Emergency Contact - Tap for Info'}/>
                <ListItemSecondaryAction>
                  <IconButton aria-label={"Call " + this.props.emerg_contact_id} href="tel:416-456-7890" disabled={this.props.emerg_contact_id === ''}>
                    <CallIcon/>
                  </IconButton>
                  <IconButton aria-label={"Send SMS to " + this.props.emerg_contact_id} href="sms:416-456-7890" disabled={this.props.emerg_contact_id === ''}>
                    <SMSIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>

          <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.modalIsOpen} 
            onClose={this.handleModalClose}>
            
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              {this.props.emerg_contact_id}
              <Divider variant="fullWidth"/>
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                    Phone: 416-456-7890 ext. 12345
                    <br/>
                    <br/>
                    Email: emergency.contact@email.ca
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                  className="emergencyContactModalButton" 
                  variant="text" 
                  onClick={this.handleModalClose}>Close</Button>
              </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default ContactCardInfo;