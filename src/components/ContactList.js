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
      notCheckedIn: [],
      markedSafe: [],
      search: '',
      emergContacts: ContactCard
    }
  }

  setUp() {
    console.log({'contacts': this.state.contacts});
    let notCheckedInArr = [];
    let checkedInArr = [];
    if (this.state.isLoading === false) {
      console.log("got Past Set Up if statement")
      let contacts = JSON.parse(this.state.contacts);
      console.log({"setUp": contacts});
      let notCheckedInArr = [];
      let checkedInArr = [];
      for(var i = 1; i < contacts.length; i++) {
        if (contacts[i]["fields"]["Status"] === "NotCheckedIn") {
          notCheckedInArr.push(contacts[i]["fields"]["Title"]);
        }
        else if (contacts[i]["fields"]["Status"] === "CheckedIn") {
          checkedInArr.push(contacts[i]["fields"]["Title"]);
        }
      }

      console.log({"result of Set Up": [notCheckedInArr, checkedInArr]});

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
    console.log("ContactList mounted");
    this.getSPlist();
    console.log("getSPlist triggered");
    console.log(this.state.contacts);
    //this.setUp();
  };


  getSPlist = function () {
    console.log({token: localStorage.getItem('accessToken')})
    this.setState({token: localStorage.getItem('accessToken')})
    
    if (localStorage.getItem('accessToken')) {

      console.log("token validation done");
      var headers = new Headers();
      console.log(typeof(this.state.token));


      console.log({token: localStorage.getItem('accessToken')})
      //var bearer = "Bearer " + this.state.token;
      var bearer = "Bearer " + localStorage.getItem('accessToken')
      console.log({"bearer": bearer});
      headers.append("Authorization", bearer);
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      var options = {
          method: "GET",
          headers: headers
      };
      console.log({'SPaddress': SP.sharepoint.list_address});
      fetch(SP.sharepoint.list_address, options)
        .then(response => response.json())
        .then(res => this.setState({
          contacts: JSON.stringify(res.value),
          isLoading: false}));
      
        // contacts: JSON.stringify(res.value),

        //localStorage.se tItem("contacts", res.value)
        console.log("got the sp info");
    
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

  /* Filter which people are displayed in both Checked-in and Not Checked-in sections based on user search*/
  filteredList(){
    // Create clone of notChekedIn and markedSafe arrays
    let tmp_notCheckedIn = [];
    let tmp_markedSafe = [];

    // Add user to tmp_notCheckedIn that match this.state.search
    for(let i = 0; i < this.state.notCheckedIn.length; i++){
      //console.log("searching for: " + this.state.search + "; Current element: " + this.state.notCheckedIn[i]);
      if(this.state.notCheckedIn[i].toLowerCase().includes(this.state.search.toLowerCase())){
        //console.log("Found match in noCheckedIn: " + this.state.notCheckedIn[i]);
        tmp_notCheckedIn.push(this.state.notCheckedIn[i]);
      }
      
    }

    // Same as above, but for users that are checked in
    for(let i = 0; i < this.state.markedSafe.length; i++){
      //console.log("searching for: " + this.state.search + "; Current element: " + this.state.markedSafe[i]);
      if(this.state.markedSafe[i].toLowerCase().includes(this.state.search.toLowerCase())){
        //console.log("Found match in markedSafe: " + this.state.markedSafe[i]);
        tmp_markedSafe.push(this.state.markedSafe[i]);
      }
    }

    // Sort the list of names
    tmp_notCheckedIn.sort();
    tmp_markedSafe.sort();
    
    let notCheckedIn = tmp_notCheckedIn.map((val, key) => {
      return <CheckedIn key={key} text={val} deleteMethod={ () => this.checkIn(key, val) } 
      />
    });
    let safepeople = tmp_markedSafe.map((val, key) => {
      return <MarkedSafe key={key} text={val} deleteMethod={ () => this.undoCheckIn(key, val) } />
    });

    //console.log({tmp_notCheckedIn});
    //console.log({notCheckedIn: this.state.notCheckedIn});
    //console.log({tmp_markedSafe});
    //console.log({markedSafe: this.state.markedSafe});
    return ([notCheckedIn, safepeople]);

  }

  render() {

    let notCheckedInArray = [];
    let markedSafeArray = [];
    if (this.state.isLoading === false) {
    let sortedContacts = this.setUp();
    notCheckedInArray = sortedContacts[0];
    markedSafeArray = sortedContacts[1];
    console.log(notCheckedInArray);
    console.log(markedSafeArray);
    }

    // List of all NOT checked-in people
    let notCheckedIn = this.state.notCheckedIn.map((val, key) => {
      return <CheckedIn key={key} text={val} deleteMethod={ () => this.checkIn(key, val) } 
      />
    })

    // List of all safely checked-in people
    let safepeople = this.state.markedSafe.map((val, key) => {
      return <MarkedSafe key={key} text={val} deleteMethod={ () => this.undoCheckIn(key, val) } />
    })

    // If user is searching for a name, filter the results
    if(this.state.search !== ''){
      let tmp_arr = this.filteredList();
      notCheckedIn = tmp_arr[0];
      safepeople = tmp_arr[1];
    }

    // <h2 className="Title">Not Checked-In</h2>
    // <div className="noCheck">
    // { notCheckedIn }
    // </div>
    // <h2 className="Title">Checked-In</h2>
    // <div className="markedSafe">
    // { safepeople }
    // </div>
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
