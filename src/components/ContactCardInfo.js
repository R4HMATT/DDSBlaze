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

    this.state = {
      employee: this.props.employeeInfo,
      emergencyContact: this.props.emergencyContactInfo,
      modalIsOpen: false,
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
    let emergencyContact = this.state.emergencyContact;
    
    return (
      <div className="ContactCardInfo">
        <div className="contactOverview">
        <Button
          className="backButton" 
          variant="outlined" 
          onClick={console.log("Clicked back button")}>
            {/* <img src={require("./assets/chevron_left.png")}/> */}
            {"< Back"}
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
              <ListItem button alignItems="center" aria-label="Emergency Contact Overview" disabled={emergencyContact["name"] === ""} onClick={this.handleModalOpen}>
                <Avatar>
                  <img className="emergencyContactProfilePic" src={require("./assets/default_profile_pic.png")}/>
                </Avatar>
                <ListItemText primary={emergencyContact["name"]} secondary={emergencyContact["name"] === "" ? 'No Emergency Contact on Record' : 'Emergency Contact - Tap for Info'}/>
                <ListItemSecondaryAction>
                  <IconButton aria-label={"Call " + emergencyContact["name"]} href={"tel:" + emergencyContact["phoneNumber"]} disabled={emergencyContact["phoneNumber"] === ""}>
                    <CallIcon/>
                  </IconButton>
                  <IconButton aria-label={"Send SMS to " + emergencyContact["name"]} href={"sms:" + emergencyContact["phoneNumber"]} disabled={emergencyContact["phoneNumber"] === ""}>
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
              {emergencyContact["name"]}
              <Divider variant="fullWidth"/>
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                <List>
                  <ListItem aria-label="Emergency Contact Phone Number">
                    Phone: {emergencyContact["phoneNumber"]}
                  </ListItem>
                  <ListItem aria-label="Emergency Contact Email">
                    Email: {emergencyContact["email"]}
                  </ListItem>
                </List>
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