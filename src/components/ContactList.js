import React, { Component } from 'react';
//import getSPlist from accessRequest.js;
import CheckedIn from './CheckedIn.js';
import MarkedSafe from './MarkedSafe.js';
import ContactCard from './ContactCard.js';
import ContactListNavBar from './ContactListNavBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import './ContactList.css';

/**** This component displays all individuals that are checked-in and not checked-in, 
   as well as the search bar and other main functionality ****/

const SP = require('../Connection.json');

// Styles applied to the Loading Spinner
const styles = theme => ({
  CircularProgress: {
    color: '#0483e8',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class ContactList extends Component {

  constructor(props) {
    super(props);

    // Bind all functions to "this"
    this.getSPlist = this.getSPlist.bind(this);
    this.setUp = this.setUp.bind(this);
    this.sortHelper = this.sortHelper.bind(this);
    this.handleSearchFilterClick = this.handleSearchFilterClick.bind(this);
    this.handleSearchFilterClose = this.handleSearchFilterClose.bind(this);

    this.state = {
      contacts: [],
      isLoading: true,
      intervalIsSet: null,
      notCheckedIn: [],
      markedSafe: [],
      search: '',
      filterMetric: ['name-increasing', 'Name Increasing'],
      searchFilterOpen: {anchorEl: null},
      emergContacts: ContactCard
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
      
        // contacts: JSON.stringify(res.value),

        //localStorage.se tItem("contacts", res.value)

    
    }
  }


  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value })
  }

  /* Move user with name "value" into the Checked-in list */
  checkIn(index, value) {
    let notCheckedInArr = this.state.notCheckedIn;
    let markedSafeArr = this.state.markedSafe;
    let temp = notCheckedInArr[index];

    // Special case where name is being searched
    if(this.state.search !== ''){
      temp = value;
      index = notCheckedInArr.indexOf(value);
    }
    notCheckedInArr.splice(index, 1);
    markedSafeArr.push(temp);

    // Sort the two lists of names
    notCheckedInArr.sort();
    markedSafeArr.sort();

    this.setState({ markedSafe: markedSafeArr })
    this.setState({ notCheckedIn: notCheckedInArr })
    
  }

  /* Move user with name "value" into the Not Checked-in list */
  undoCheckIn(index, value) {
    let notCheckedInArr = this.state.notCheckedIn;
    let markedSafeArr = this.state.markedSafe;
    let temp = markedSafeArr[index];

    // Special case where a name is being searched
    if(this.state.search !== ''){
      temp = value;
      index = markedSafeArr.indexOf(value);

    }
    markedSafeArr.splice(index, 1);
    notCheckedInArr.push(temp);

    // Sort the two lists of names
    notCheckedInArr.sort();
    markedSafeArr.sort();

    this.setState({ markedSafe: markedSafeArr })
    this.setState({ notCheckedIn: notCheckedInArr })
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
  }

  render() {
    let notCheckedInArray = [];
    let markedSafeArray = [];
    if (this.state.isLoading === false) {
      let sortedContacts = this.setUp();
      notCheckedInArray = sortedContacts[0];
      markedSafeArray = sortedContacts[1];
    }
    
    // Combine the list of notCheckeIn and checkedIn people to get total list
    let employeeList = notCheckedInArray.concat(markedSafeArray);

   let notCheckedInFiltered = [];
   let markedSafeFiltered = [];    

    /* Filter which people are displayed in both Checked-in and Not Checked-in sections based on user search*/
    if(this.state.search !== '') {

      // Create clone of notChekedIn and markedSafe arrays
      // Add user to tmp_notCheckedIn that match this.state.search
      for(let i = 0; i < notCheckedInArray.length; i++){
        if(notCheckedInArray[i].fields.Title.toLowerCase().includes(this.state.search.toLowerCase())){
          notCheckedInFiltered.push(notCheckedInArray[i]);
        }  
      }

      // Same as above, but for users that are checked in
      for(let i = 0; i < markedSafeArray.length; i++){
        if(markedSafeArray[i].fields.Title.toLowerCase().includes(this.state.search.toLowerCase())){
          markedSafeFiltered.push(markedSafeArray[i]);
        }
      }

    }
      else {
        notCheckedInFiltered = notCheckedInArray;
        markedSafeFiltered = markedSafeArray;
      };

      // Sort the list of names
      notCheckedInFiltered.sort(this.sortHelper);
      markedSafeFiltered.sort(this.sortHelper);
      if(this.state.filterMetric[0] === "name-decreasing"){
        notCheckedInFiltered.reverse();
        markedSafeFiltered.reverse();
      }
      
      let notCheckedIn = notCheckedInFiltered.map( elem => {
        return <CheckedIn id={elem.id} text={elem.fields.Title + " " + elem.fields["Last_x0020_Name"]} employeeList={employeeList} status={elem.fields.Status}/>
      });
      let safepeople = markedSafeFiltered.map(elem => {
        return <MarkedSafe id={elem.id} text={elem.fields.Title + " " + elem.fields["Last_x0020_Name"]} employeeList={employeeList} status={elem.fields.Status}/>
      });
    

    let totalList = notCheckedIn.concat(safepeople);
    const {anchorEl} = this.state.searchFilterOpen;
    const open = Boolean(anchorEl);
    const filterMetric = this.state.filterMetric;
    const isLoading = this.state.isLoading;
    const { classes } = this.props;
    return (
      <div className="container">
          <div className="search-wrapper">
            <div className="sortFilterWrapper">
              <Button size="small" variant="outlined" onClick={this.handleSearchFilterClick} classes={{root: 'sortButton'}}>
                {"Sort by: " + filterMetric[1]}
                <ExpandMoreIcon/>
              </Button>
            </div>
            <input type="text" className="searchBar" onChange={this.updateSearch.bind(this)} placeholder="Search a User..." value={this.state.search} />
          </div>
          <ContactListNavBar notCheckedIn={notCheckedIn} safepeople={safepeople}/>
          {isLoading && 
          <div className="loadingCircle">
            <CircularProgress color="primary" variant="indeterminate" classes={{colorPrimary: classes.CircularProgress}}/>
            <br/>
            <h4>Loading...</h4>
          </div>}

          {/* This Menu component handles which metric a user wants to sort the contact list by */}
          <Menu
          className="sortMenu" 
          anchorEl={anchorEl} 
          open={open} 
          PaperProps={{
            style: {
              maxHeight: 200,
              width: 170,
              float: 'right',
            },
          }}>
          <ClickAwayListener onClickAway={event => this.handleSearchFilterClose(event, this.state.filterMetric)}>

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

              <MenuItem 
              onClick={event => this.handleSearchFilterClose(event, ["team-lead-levon", "Team Lead - Levon"])} 
              selected={filterMetric[0] === "team-lead-levon"}>
                <Typography variant="subheading" noWrap> Team Lead: Levon </Typography>
              </MenuItem>

              
              <MenuItem 
              onClick={event => this.handleSearchFilterClose(event, ["team-lead-rahm", "Team Lead - Rahmatullah"])} 
              selected={filterMetric[0] === "team-lead-rahm"}>
                <Typography variant="subheading" noWrap> Team Lead: Rahmatullah </Typography>
              </MenuItem>
            </ClickAwayListener>
          </Menu>
          
      </div>
    );
  }
};

export default withStyles(styles)(ContactList);
