import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './BulkMessageModal.css';

function Transition(props){
    return <Slide direction="up" {...props}/>;
}

class BulkMessageModal extends React.Component{

    constructor(props){
        super(props);
        this.handleClose = this.props.handleClose.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.state = {
            contacts: [],
            dialogOpen: true,
            value: 0,
            textAreaInput: '',
        }
    }

    handleChange = (event, new_val) => {
        this.setState({ value: new_val });
    };

    handleDialogClose(){
        this.setState({dialogOpen: false});
        this.handleClose();
    }

    render(){
        const { value } = this.state;
        return (
            <Dialog fullScreen open={this.state.dialogOpen} onClose={this.handleClose} TransitionComponent={Transition}>
                <DialogTitle>
                    Send Bulk Message
                    <Divider/>
                </DialogTitle>

                <DialogContent>
                    <AppBar position="static" color="default">
                        <Tabs value={value} onChange={this.handleChange} indicatorColor="secondary">
                            <Tab disableRipple label="Email"/>
                            <Tab disableRipple label="SMS"/>
                        </Tabs>
                    </AppBar>
                    {value === 0 && 
                    <div className="sendMessage">
                        <br/>
                        <div className="to">
                            <h5>To: Not Checked-In Employees</h5>
                        </div>
                        <br/>
                        <div className="subject">
                            <h5>Subject: </h5>
                            <input type="text" className="subjectMessage" defaultValue="**FIRE ALARM ACTIVATED**" placeholder="Enter a Subject..."/>
                        </div>
                        
                        <textarea className="messageDetails" placeholder="Enter a Message..." 
                        defaultValue={"**[ATTENTION]**\n\nEmergency Fire Alarm has been activated. Please navigate to the designated area."}/>
                    </div>}

                    {/* {value === 1 && 
                    <div className="sendMessage">
                        <br/>
                        <h4>Enter SMS below to send:</h4>
                        <textarea className="messageInput" placeholder="Enter a Message..." 
                        defaultValue="[ATTENTION] Emergency Alarm has been activated. Please proceed to your designated area."/>
                    </div>} */}
                </DialogContent>

                <DialogActions>
                    <Button variant="text" onClick={this.handleDialogClose} color="secondary">
                        Close
                    </Button>
                    <Button variant="text" onClick={this.handleDialogClose} color="primary">
                        Send
                        <SendIcon/>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default BulkMessageModal;