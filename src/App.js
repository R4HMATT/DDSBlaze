import React, { Component } from 'react';
import CheckedIn from './components/CheckedIn.js';
import MarkedSafe from './components/MarkedSafe.js';
import ContactCard from './components/ContactCard.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    let contacts = require('./ContactInfo.json');
    let notCheckedInArr = [];
    for(var i = 1; i < contacts.length; i++){
      notCheckedInArr.push(contacts[i]["B"]);
    }
    notCheckedInArr.sort()
    this.state = {
      notCheckedIn: notCheckedInArr,
      markedSafe: [],
      search: '',
      emergContacts: ContactCard
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
    for(var i = 0; i < this.state.notCheckedIn.length; i++){
      //console.log("searching for: " + this.state.search + "; Current element: " + this.state.notCheckedIn[i]);
      if(this.state.notCheckedIn[i].toLowerCase().includes(this.state.search.toLowerCase())){
        //console.log("Found match in noCheckedIn: " + this.state.notCheckedIn[i]);
        tmp_notCheckedIn.push(this.state.notCheckedIn[i]);
      }
      
    }

    // Same as above, but for users that are checked in
    for(var i = 0; i < this.state.markedSafe.length; i++){
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

    let totalList = notCheckedIn.concat(safepeople);
    return (
      <div className="container">
          <div className="search-wrapper">
            <input type="text" className="searchBar" onChange={this.updateSearch.bind(this)} placeholder="Search..." value={this.state.search} />
            <button class="searchIcon"
						 name="searchIcon"
						 type="button"
						 />
          </div>
            <h2 className="Title">Not Checked-In</h2>
              <div className="noCheck">
              { notCheckedIn }
              </div>
              <h2 className="Title">Checked-In</h2>
              <div className="markedSafe">
              { safepeople }
              </div>
      </div>
    );
  }
}

export default App;
