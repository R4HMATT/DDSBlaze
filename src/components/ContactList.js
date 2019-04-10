import React, { Component } from 'react';
//import getSPlist from accessRequest.js;
import ContactSummary from './ContactSummary.js';
import ContactCard from './ContactCard.js';
import BulkMessageModal from './BulkMessageModal';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import SwipeableViews from 'react-swipeable-views';
import Toolbar from '@material-ui/core/Toolbar';
import './ContactList.css';

/**** This component displays all individuals that are checked-in and not checked-in, 
   as well as the search bar and other main functionality ****/

const SP = require('../Connection.json');

// Styles applied to the Loading Spinner
const styles = theme => ({
  CircularProgress: {
    color: '#0483e8',
  },
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  AppBar: {
    backgroundColor: '#0483e8',
  },
  Badge: {
    backgroundColor: "#4CAF50"
  },
  padding: {
    padding: "7px",
    margin: "10px",
  },
  grow: {
    flexGrow: 1,
  },
});

function TransitionUp(props){
  return <Slide direction="up" {...props}/>;
}

class ContactList extends Component {

  constructor(props) {
    super(props);

    // Bind all functions to "this"
    this.getSPlist = this.getSPlist.bind(this);
    this.setUp = this.setUp.bind(this);
    this.sortHelper = this.sortHelper.bind(this);

    this.checkIn = this.checkIn.bind(this);
    this.undoCheckIn = this.undoCheckIn.bind(this);

    this.handleSearchFilterClick = this.handleSearchFilterClick.bind(this);
    this.handleSearchFilterClose = this.handleSearchFilterClose.bind(this);

    this.handleNavDrawerOpen = this.handleNavDrawerOpen.bind(this);
    this.handleNavDrawerClose = this.handleNavDrawerClose.bind(this);

    this.handleBulkMessageModalOpen = this.handleBulkMessageModalOpen.bind(this);
    this.handleBulkMessageModalClose = this.handleBulkMessageModalClose.bind(this);

    this.getNameByID = this.getNameByID.bind(this);

    this.state = {
      contacts: [],
      value: 0,
      isLoading: true,
      navDrawerOpen: false,
      bulkMessageOpen: false,
      intervalIsSet: null,
      notCheckedIn: [],
      markedSafe: [],
      search: '',
      filterMetric: ['name-increasing', 'Name Increasing'],
      searchFilterOpen: {anchorEl: null},
      emergContacts: ContactCard,
    }
  }

  setUp() {
    let notCheckedInArr = [];
    let checkedInArr = [];
    if (this.state.isLoading === false) {
      let contacts = JSON.parse(this.state.contacts);
      let notCheckedInArr = [];
      let checkedInArr = [];
      for(var i = 0; i < contacts.length; i++) {
        if (contacts[i]["fields"]["Status"] === "NotCheckedIn") {
          notCheckedInArr.push(contacts[i]);
        }
        else if (contacts[i]["fields"]["Status"] === "CheckedIn") {
          checkedInArr.push(contacts[i]);
        }
      }
      return [notCheckedInArr, checkedInArr];
      /* 
      notCheckedInArr.sort();
      checkedInArr.sort();
      this.setState({
                    notCheckedIn: notCheckedInArr,
                    markedSafe: checkedInArr
                  });
      */
      }
    }


  componentDidMount() {
    this.getSPlist();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getSPlist, 1000);
      this.setState({ intervalIsSet: interval });
    }
  };

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getSPlist = function () {

    this.setState({token: localStorage.getItem('accessToken')})
    
    if (localStorage.getItem('accessToken')) {

      var headers = new Headers();

      //var bearer = "Bearer " + this.state.token;
      var bearer = "Bearer " + localStorage.getItem('accessToken')

      headers.append("Authorization", bearer);
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      var options = {
          method: "GET",
          headers: headers
      };

      fetch(SP.sharepoint.list_address, options)
        .then(response => response.json())
        .then(res => this.setState({
          contacts: JSON.stringify(res.value),
          isLoading: false}));
    }
  }


  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value })
  }

  /* Move user with name "value" into the Checked-in list */
  checkIn(employee_id, employee_name) {
    let message = "Checked In: " + employee_name;
    let timeout = 3000;

    this.props.enqueueSnackbar(message, {
      variant: "success",
      autoHideDuration: timeout,
      action: (
        <Button size="small" variant="outlined" color="inherit">Undo</Button>
      ),
    });
  }

  /* Move user with name "value" into the Not Checked-in list */
  undoCheckIn(employee_id, employee_name) {
    let message = "Checked-Out: " + employee_name;
    let timeout = 3000;

    this.props.enqueueSnackbar(message, {
      variant: "warning",
      autoHideDuration: timeout,
      action: (
        <Button size="small" variant="outlined" color="inherit">Undo</Button>
      ),
    });
  }

  updateSearch(event) {
    this.setState({search: event.target.value});

  }
  
  /* A compare function for array.sort() that compares the username of two people given their IDs
  (dict, dict) -> int */
  sortHelper(id_1, id_2){

    // Names of employees with given ID
    let employee_1 = id_1.fields.Title + " " + id_1.fields.Last_x0020_Name;
    let employee_2 = id_2.fields.Title + " " + id_2.fields.Last_x0020_Name;

    // Compare the two names; return -1 if id_1 < id_2, 1 if id_1 > id_2, and 0 if id_1 === id_2
    if(employee_1 < employee_2){
      return -1;
    } else if(employee_1 > employee_2){
      return 1;
    } else{
      return 0;
    }
  }

  /*Handle opening the popup sorting  */
  handleSearchFilterClick(event){
    this.setState({searchFilterOpen: {anchorEl: event.currentTarget}});
  }

  handleSearchFilterClose(event, metric){
    if(metric !== "null"){
      this.setState({filterMetric: metric});
    }
    this.setState({searchFilterOpen: {anchorEl: null}});
    this.handleNavDrawerClose();
  }

  /*A function to handle opening the side nav drawer */
  handleNavDrawerOpen(){
    this.setState({navDrawerOpen: true});
  }

  /*A function to handle closing the side navigation drawer */
  handleNavDrawerClose(){
    this.setState({navDrawerOpen: false});
  }

  handleBulkMessageModalOpen(){
    this.setState({bulkMessageOpen: true});
    this.handleNavDrawerClose();
  }

  handleBulkMessageModalClose(){
    this.setState({bulkMessageOpen: false});
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  /*A function to return the name of an employee given their ID 
    (string, array) -> string */
  getNameByID(employeeID, employeeList){
    for(let i = 0; i < employeeList.length; i++){
      if(employeeList[i]["id"] === employeeID){
        return employeeList[i]["fields"]["Title"] + " " + employeeList[i]["fields"]["Last_x0020_Name"];
      }
    }
    return '';
  }

  render() {
    // Get list of all employees
    let notCheckedInArray = [];
    let markedSafeArray = [];
    let notCheckedInFiltered = [];
    let markedSafeFiltered = [];
    
    let teamLeadsTemp = new Set();
    let teamLeads = [];

    let employeeList = []

    if (this.state.isLoading === false) {
      let sortedContacts = this.setUp();
      notCheckedInArray = sortedContacts[0];
      markedSafeArray = sortedContacts[1];

      // Combine the list of notCheckeIn and checkedIn people to get total list
      employeeList = notCheckedInArray.concat(markedSafeArray);

      /* Get list of all Team Leads */
      for(let i = 0; i < employeeList.length; i++){
        teamLeadsTemp.add(employeeList[i]["fields"]["PrimaryLeadID"]);
      }
      // Go through teamLeadsTemp and add all ID and name of each tem lead into teamLeads
      for(let elem of teamLeadsTemp){
        teamLeads.push([elem, "Team Lead - " + this.getNameByID(elem, employeeList)]);
      }

      /* Filter which people are displayed in both Checked-in and Not Checked-in sections based on user search */
      if(this.state.search !== '') {
  
        // Create clone of notChekedIn and markedSafe arrays
        // Add user to tmp_notCheckedIn that match this.state.search
        for(let i = 0; i < notCheckedInArray.length; i++){
          if((notCheckedInArray[i].fields.Title.toLowerCase() + " " + notCheckedInArray[i].fields.Last_x0020_Name.toLowerCase()).includes(this.state.search.toLowerCase())){
            notCheckedInFiltered.push(notCheckedInArray[i]);
          }  
        }
  
        // Same as above, but for users that are checked in
        for(let i = 0; i < markedSafeArray.length; i++){
          if((markedSafeArray[i].fields.Title.toLowerCase() + " " + markedSafeArray[i].fields.Last_x0020_Name.toLowerCase()).includes(this.state.search.toLowerCase())){
            markedSafeFiltered.push(markedSafeArray[i]);
          }
        }
  
      }
        else {
          // Clone the two starting arrays
          notCheckedInFiltered = notCheckedInArray.slice();
          markedSafeFiltered = markedSafeArray.slice();
      };

      /* Filter the list of names based on this.state.filterMetric[0] */
      notCheckedInFiltered.sort(this.sortHelper);
      markedSafeFiltered.sort(this.sortHelper);

      if(this.state.filterMetric[0] === "name-increasing"){
        //Do nothing
      }
      else if(this.state.filterMetric[0] === "name-decreasing"){
        notCheckedInFiltered.reverse();
        markedSafeFiltered.reverse();
      } else{
        // Go through both lists and remove employees who don't have PrimaryLeadID as this.state.filterMetric[0]
        for(let i = 0; i < notCheckedInFiltered.length; i++){
          if(notCheckedInFiltered[i]["fields"]["PrimaryLeadID"].toString() !== this.state.filterMetric[0]){
            notCheckedInFiltered.splice(i, 1);
            i--;
          }
        }
        for(let i = 0; i < markedSafeFiltered.length; i++){
          if(markedSafeFiltered[i]["fields"]["PrimaryLeadID"].toString() !== this.state.filterMetric[0]){
            markedSafeFiltered.splice(i, 1);
            i--;
          }
        }
      }
    }
    console.log(notCheckedInFiltered);
    let notCheckedIn = notCheckedInFiltered.map( elem => {
      return <ContactSummary employeeList={employeeList} checkIn={this.checkIn} undoCheckIn={this.undoCheckIn}
      employeeInfo={
        {
          "id": elem.id,
          "name": elem.fields.Title + " " + elem.fields["Last_x0020_Name"],
          "status": elem.fields.Status,
          "employeePosition": elem.fields.nlrj,
          "employeeLocation": elem.fields.Work_x0020_Location_x0020_,
          "employeePhoneNumber": elem.fields._x0066_pv8,
          "employeeEmail": elem.fields.Work_x0020_Email,
          "emergencyContactID": elem.fields.EmergencyContactID.toString(),
        }
      }/>
    });

    let safepeople = markedSafeFiltered.map(elem => {
      return <ContactSummary employeeList={employeeList} checkIn={this.checkIn} undoCheckIn={this.undoCheckIn}
      employeeInfo={
        {
          "id": elem.id,
          "name": elem.fields.Title + " " + elem.fields["Last_x0020_Name"],
          "status": elem.fields.Status,
          "employeePosition": elem.fields.nlrj,
          "employeeLocation": elem.fields.Work_x0020_Location_x0020_,
          "employeePhoneNumber": elem.fields._x0066_pv8,
          "employeeEmail": elem.fields.Work_x0020_Email,
          "emergencyContactID": elem.fields.EmergencyContactID.toString(),
        }
      }/>
    });
    
    const {anchorEl} = this.state.searchFilterOpen;
    const { classes } = this.props;
    const {value} = this.state;
    const open = Boolean(anchorEl);
    const filterMetric = this.state.filterMetric;
    const notCheckedInTotal = notCheckedIn.length;
    const safePeopleTotal = safepeople.length;
    const isLoading = this.state.isLoading;

    // menuItems contains one row for each Primary Lead in SP List
    let menuItems = teamLeads.map(elem => {
      return (<MenuItem
                onClick={event => this.handleSearchFilterClose(event, elem)}
                selected={filterMetric[0] === elem[0]}>
                <Typography variant="subheading" noWrap> {elem[1]} </Typography>
              </MenuItem>)
    });

    return (
      <div className="container">

        {/* 1. Render all Checked-In and Not Checked-In employees */}
        <NoSsr>
          <div className={classes.root}>
            <AppBar position="sticky" color="primary" classes={{colorPrimary: classes.AppBar}}>
              <Toolbar>
                <Paper elevation={1} className="searchWrapper">
                  <IconButton onClick={this.handleNavDrawerOpen} color="black">
                    <MenuIcon/>
                  </IconButton>

                  {/* SEARCH BAR */}
                  <InputBase type="search" className="searchBar" onChange={this.updateSearch.bind(this)} placeholder="Search User..." value={this.state.search}/>
                  <img src={require('./assets/search_icon.png')} className="searchIcon" height="28px" width="28px"/>
                </Paper>
              </Toolbar>

              <Tabs variant="fullWidth" value={value} onChange={this.handleTabChange} indicatorColor="secondary">
                <Tab label={
                  <Badge className={classes.padding} color="secondary" badgeContent={notCheckedInTotal} max={999}>
                    Not Checked-In
                  </Badge>
                } />

                <Tab label={
                  <Badge className={classes.padding} color="primary" badgeContent={safePeopleTotal} max={999} classes={{colorPrimary: classes.Badge}}>
                    Checked-In
                  </Badge>
                } />
              </Tabs>
            </AppBar>

            {/* 1.1 If user is filtering by team leads, show the name at the top */}
            {((filterMetric[0] !== "name-increasing") && (filterMetric[0] !== "name-decreasing")) && 
              <div className="filterMessage">
                <h3>
                  {filterMetric[1]}
                </h3>
                
              </div>}
            <Divider variant="middle"/>
            <SwipeableViews disabled={true} index={value} onChangeIndex={this.handleTabChange} axis={value === 0 ? 'x-reverse' : 'x'}>
              <div>{notCheckedIn}</div>
              <div>{safepeople}</div>
            </SwipeableViews>
          </div>
        </NoSsr>

        {/* 1.2 Loading Circle while SharePoint data is being recieved */}
        {isLoading && 
        <div className="loadingCircle">
          <CircularProgress color="primary" variant="indeterminate" classes={{colorPrimary: classes.CircularProgress}}/>
          <br/>
          <h4>Loading...</h4>
        </div>}

        {/* 2. This Menu component handles which metric a user wants to sort the contact list by */}
        <Menu
        className="sortMenu" 
        anchorEl={anchorEl} 
        open={open} 
        PaperProps={{
          style: {
            maxHeight: 200,
            width: "60%",
            maxWidth: 300,
            float: 'right',
          },
        }}>

        {/* Typography component is used for MenuItem text because it allows for ellipses on text-overflow */}
            <MenuItem 
            onClick={event => this.handleSearchFilterClose(event, ["name-increasing", "Name Increasing"])} 
            selected={filterMetric[0] === "name-increasing"}>
              <Typography variant="subheading" noWrap> Name: Ascending </Typography>
            </MenuItem>

            <MenuItem 
            onClick={event => this.handleSearchFilterClose(event, ["name-decreasing", "Name Decreasing"])} 
            selected={filterMetric[0] === "name-decreasing"}>
              <Typography variant="subheading" noWrap> Name: Descending </Typography>
            </MenuItem>

            {menuItems}
        </Menu>

        {/* 3. Side navigation drawer */}
        <Drawer anchor="left" open={this.state.navDrawerOpen} onClose={this.handleNavDrawerClose}>
            <div tabIndex={0} role="button">
              <List>
                <ListItem button onClick={this.handleSearchFilterClick} color="inherit">
                  <ListItemText primary="Filter/Sort Contacts" secondary={filterMetric[1]}/>
                  <ExpandMoreIcon/>
                </ListItem>

                <Divider/>

                <ListItem button onClick={this.handleBulkMessageModalOpen}>
                  <ListItemIcon>
                    <SendIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Bulk Message"/>
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Logout"/>
                </ListItem>
              </List>
            </div>
        </Drawer>

        {/* 4. Pop-up dialog for sending bulk messages */}
        <Dialog fullScreen open={this.state.bulkMessageOpen} onClose={this.handleBulkMessageModalClose} TransitionComponent={TransitionUp} scroll="paper">
          <BulkMessageModal handleClose={this.handleBulkMessageModalClose} notCheckedIn={notCheckedInArray}/>
        </Dialog>
          
      </div>
    );
  }
};

export default withSnackbar(withStyles(styles)(ContactList));
