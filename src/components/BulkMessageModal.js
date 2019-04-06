import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import './BulkMessageModal.css';

function Transition(props){
    return <Slide direction="up" {...props}/>;
}

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
            subjectValue: "**FIRE ALARM ACTIVATED**",
            bodyValue: "**[ATTENTION]**\n\nEmergency Fire Alarm has been activated. Please navigate to the designated area.",
        }
    }

    handleChange = (event, new_val) => {
        this.setState({ value: new_val });
    };

    handleDialogClose(){
        this.setState({dialogOpen: false});
        this.handleClose();
    }

    handleMessageSend(){
        alert("Sent the following email/sms: \n\n" + this.state.bodyValue);
    }

    updateSubject(event) {
        this.setState({subjectValue: event.target.value});
    }
    
    updateBody(event) {
        this.setState({bodyValue: event.target.value});
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
            <Dialog fullScreen open={this.state.dialogOpen} onClose={this.handleClose} TransitionComponent={Transition}>
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
                            {/* <h5>To: Not Checked-In Employees</h5> */}
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography className={{root: "toHeading"}}> To: </Typography>
                                    <Typography> {numEmployees + " Not Checked-In Employee(s)"} </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div>
                                        {employeeChips}
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        {value === 0 && <div className="subject">
                            <TextField hidden dense classes={{root: "subjectMessage"}} variant="outlined" label="Subject" 
                            margin="none" onChange={this.updateSubject} value={this.state.subjectValue}/>
                        </div>}
                        
                        <div className="message">
                            <TextField fullWidth multiline rows="7" classes={{root: "messageDetails"}} inputProps={{}} variant="outlined" label="Body" 
                            margin="none" onChange={this.updateBody} value={this.state.bodyValue}/>
                        </div>
                    </div>
                </div>

                <DialogActions>
                    <Button variant="text" onClick={this.handleMessageSend} color="primary">
                        Send
                        <SendIcon/>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default BulkMessageModal;