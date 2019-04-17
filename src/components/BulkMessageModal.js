import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'notistack';
import './BulkMessageModal.css';

class BulkMessageModal extends React.Component{

    constructor(props){
        super(props);
        this.handleClose = this.props.handleClose.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleMessageSend = this.handleMessageSend.bind(this);
        this.updateSubject = this.updateSubject.bind(this);
        this.updateBody = this.updateBody.bind(this);

        this.state = {
            contacts: [],
            dialogOpen: true,
            value: 0,
            subjectValue: "**Fire Alarm Activated**",
            emailBodyValue: "**[ATTENTION]**\n\nEmergency Fire Alarm has been activated. Please navigate to the designated area.",
            smsBodyValue: "**[ATTENTION]**\n\nEmergency Fire Alarm has been activated. Please navigate to the designated area.",
        }
    }

    /* Handle tab change between Email and SMS */
    handleChange = (event, new_val) => {
        this.setState({ value: new_val });
    };

    /* Close the current bulk message dialog*/
    handleDialogClose(){
        this.setState({dialogOpen: false});
        this.handleClose();
    }

    /** Handle reponse from MS Graph POST request
     * (object) => <Snackbar/>
     */
    handleResponse(response){
        if(response.ok){
            // Return success snackbar since the POST request went through
            return(
                this.props.enqueueSnackbar("Sent Email", {
                variant: "success",
                autoHideDuration: 5000,
                action: (
                    <Button size="small" variant="outlined" color="inherit">Dismiss</Button>
                ),
                })
            );
        }
        return (
            this.props.enqueueSnackbar(response.error.message, {
            variant: "error",
            autoHideDuration: 10000,
            action: (
                <Button size="small" variant="outlined" color="inherit">Dismiss</Button>
            ),
            })
        );
    }

    /* Send the Email/SMS user has written */
    handleMessageSend(){
        const fetch = require('node-fetch');
        let endpoint = "https://graph.microsoft.com/v1.0/me/sendMail";

        // If user is in the SMS tab
        if(this.state.value){
            alert("Sent SMS: \n\n" + this.state.smsBodyValue);
        } else{
            let subjectValue = this.state.subjectValue;
            let emailBodyValue = this.state.emailBodyValue;

            if (localStorage.getItem('accessToken')) {
                var bearer = "Bearer " + localStorage.getItem("accessToken");
                var body = {
                "message": {
                    "subject": "ms graph email",
                    "body": {
                        "contentType": "Text",
                        "content": "body content"
                    },
                    "toRecipients": [
                        {
                        "emailAddress": {
                            "address": "bilal.009@hotmail.com"
                        }
                        },
                        {
                        "emailAddress": {
                            "address": "bahmed4343@gmail.com"
                        }
                        }
                    ],
                    },
                };
          
                // Headers and body of request we want to send
                var options = {
                    method: "POST",
                    headers: {
                      "Authorization": bearer,
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify(body),
                };
          
                fetch(endpoint, options)
                .then(response => response.json())
                .then(response => this.handleResponse(response));

                // this.props.enqueueSnackbar("Sent Email", {
                //     variant: "success",
                //     autoHideDuration: 5000,
                //     action: (
                //         <Button size="small" variant="outlined" color="inherit">Dismiss</Button>
                //     ),
                //     })
              }
            // alert("Sent the following Email: \n\n" + "Subject: " + this.state.subjectValue + " \n\nBody: \n" + this.state.emailBodyValue);
        }
        
    }

    /* Update the Subject field in Email tab */
    updateSubject(event) {
        this.setState({subjectValue: event.target.value});
    }
    
    /* Update the Body field in Email/SMS tab */
    updateBody(event) {
        // If user is in the SMS Tab
        if(this.state.value){
            this.setState({smsBodyValue: event.target.value});
        } else{
            this.setState({emailBodyValue: event.target.value});
        }
    }

    render(){
        // The names of all not checked-in employees are displayed as Chip components
        let notCheckedIn = this.props.notCheckedIn;
        let employeeChips = notCheckedIn.map(elem => {
            return <Chip label={elem.fields.Title + " " + elem.fields.Last_x0020_Name} classes={{root: "chips"}}/>
        });
        
        const { value } = this.state;
        const numEmployees = notCheckedIn.length;
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <div className="heading">
                            Send Bulk Message
                        </div>

                        <IconButton variant="text" onClick={this.handleDialogClose} color="default">
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                
                    <Tabs value={value} onChange={this.handleChange} indicatorColor="secondary">
                        <Tab disableRipple label="Email"/>
                        <Tab disableRipple label="SMS"/>
                    </Tabs>
                </AppBar>
                    
                {/* Handles displaying all text boxes + expansion panel */}
                <div className="dialogContent">
                    <div className="sendMessage">
                        <div className="to">
                            <ExpansionPanel elevation={0}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <h4>{"To: " + numEmployees + " Employee(s)"}</h4>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div>
                                        {employeeChips}
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>

                        {value === 0 && <div className="subject">
                            <TextField hidden dense="true" variant="outlined" label="Subject" 
                            margin="none" onChange={this.updateSubject} value={this.state.subjectValue}/>
                        </div>}
                        
                        <div className="message">
                            <TextField fullWidth multiline rows="7" inputProps={{}} variant="outlined" label="Body" 
                            margin="none" onChange={this.updateBody} value={value === 1 ? this.state.smsBodyValue : this.state.emailBodyValue}/>
                        </div>
                    </div>
                </div>

                <DialogActions>
                    <Button variant="text" onClick={this.handleMessageSend} color="primary">
                        <h3>Send</h3>
                        <SendIcon/>
                    </Button>
                </DialogActions>
            </div>
        );
    }
}

export default withSnackbar(BulkMessageModal);