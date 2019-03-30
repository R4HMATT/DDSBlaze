import React, { Component } from 'react';
//import getSPlist from accessRequest.js;
import CheckedIn from './CheckedIn.js';
import MarkedSafe from './MarkedSafe.js';
import ContactCard from './ContactCard.js';
import ContactListNavBar from './ContactListNavBar';
import './ContactList.css';

/**** This component displays all individuals that are checked-in and not checked-in, 
   as well as the search bar and other main functionality ****/

const SP = require('../Connection.json');

class ContactList extends Component {

  constructor(props) {
    super(props);
    this.getSPlist = this.getSPlist.bind(this);
    this.setUp = this.setUp.bind(this);
    // let contacts = require('./ContactInfo.json');
    //let contacts = JSON.parse(localStorage.getItem("contacts"));
    //console.log(contacts)
    this.state = {
      contacts: [],
      isLoading: true,
      intervalIsSet: null,
      notCheckedIn: [],
      markedSafe: [],
      search: '',
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
      for(var i = 1; i < contacts.length; i++) {
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

  addNote() {
    if (this.state.noteText === '') {return}

    let notCheckedInArr = this.state.notCheckedIn;
    notCheckedInArr.push(this.state.noteText);
    this.setState( { noteText: ''});
    this.textInput.focus();


  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      let notCheckedInArr = this.state.notCheckedIn;
      notCheckedInArr.push(this.state.noteText);
      this.setState( { noteText: ''});

    }
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

  render() {

    let notCheckedInArray = [];
    let markedSafeArray = [];
    if (this.state.isLoading === false) {
      let sortedContacts = this.setUp();
      notCheckedInArray = sortedContacts[0];
      markedSafeArray = sortedContacts[1];
    }

   let notCheckedInFiltered = [];
   let markedSafeFiltered = [];    

    /* Filter which people are displayed in both Checked-in and Not Checked-in sections based on user search*/
    if(this.state.search !== '') {

      // Create clone of notChekedIn and markedSafe arrays
      // Add user to tmp_notCheckedIn that match this.state.search
      for(let i = 0; i < notCheckedInArray.length; i++){
        //console.log("searching for: " + this.state.search + "; Current element: " + this.state.notCheckedIn[i]);
        if(notCheckedInArray[i].fields.Title.toLowerCase().includes(this.state.search.toLowerCase())){
          //console.log("Found match in noCheckedIn: " + this.state.notCheckedIn[i]);
          notCheckedInFiltered.push(notCheckedInArray[i]);
        }  
      }

      // Same as above, but for users that are checked in
      for(let i = 0; i < markedSafeArray.length; i++){
        //console.log("searching for: " + this.state.search + "; Current element: " + this.state.markedSafe[i]);
        if(markedSafeArray[i].fields.Title.toLowerCase().includes(this.state.search.toLowerCase())){
          //console.log("Found match in markedSafe: " + this.state.markedSafe[i]);
          markedSafeFiltered.push(markedSafeArray[i]);
        }
      }

    }
      else {
        notCheckedInFiltered = notCheckedInArray;
        markedSafeFiltered = markedSafeArray;
      };

      // Sort the list of names
      notCheckedInFiltered.sort();
      markedSafeFiltered.sort();
      
      let notCheckedIn = notCheckedInFiltered.map( elem => {
        // really need to change that last name thing

        return <CheckedIn id={elem.id} text={elem.fields.Title} status={elem.fields.Status}/>
      });
      let safepeople = markedSafeFiltered.map(elem => {
        // really need to change that last name thing

        return <MarkedSafe id={elem.id} text={elem.fields.Title} status={elem.fields.Status}/>
      });
    

    let totalList = notCheckedIn.concat(safepeople);
    return (
      <div className="container">
          <div className="search-wrapper">
            <input type="text" className="searchBar" onChange={this.updateSearch.bind(this)} placeholder="Search a User..." value={this.state.search} />
          </div>
          <ContactListNavBar notCheckedIn={notCheckedIn} safepeople={safepeople}/>
      </div>
    );
  }
};

export default ContactList;
