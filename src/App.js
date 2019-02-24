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
    this.setState({ markedSafe: markedSafeArr })
    this.setState({ notCheckedIn: notCheckedInArr })
    
  }

  undoCheckIn(index, value) {
    let notCheckedInArr = this.state.notCheckedIn;
    let markedSafeArr = this.state.markedSafe;
    let temp = markedSafeArr[index];

    // Special case where a name is being searched
    if(this.state.search !== ''){
      temp = value;
      index = markedSafeArr.indexOf(value);

    }
    console.log("Removing person: " + value + " at index (key): " + index);
    markedSafeArr.splice(index, 1);
    notCheckedInArr.push(temp);
    this.setState({ markedSafe: markedSafeArr })
    this.setState({ notCheckedIn: notCheckedInArr })
  }

  updateSearch(event) {
    this.setState({search: event.target.value});

  }


  render() {
    // List of all NOT checked-in people
    let notCheckedIn = this.state.notCheckedIn.map((val, key) => {
      return <CheckedIn key={key} text={val} deleteMethod={ (notCheckedIn) => this.checkIn(key, val) } 
      />
    })

    // List of all safely checked-in people
    let safepeople = this.state.markedSafe.map((val, key) => {
      return <MarkedSafe key={key} text={val} deleteMethod={ (markedSafe) => this.undoCheckIn(key, val) } />
    })

    // ==== SEARCH BAR FUNCTIONALITY ====

    if(this.state.search !== ''){
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

      notCheckedIn = tmp_notCheckedIn.map((val, key) => {
        return <CheckedIn key={key} text={val} deleteMethod={ () => this.checkIn(key, val) } 
        />
      })
      safepeople = tmp_markedSafe.map((val, key) => {
        return <MarkedSafe key={key} text={val} deleteMethod={ () => this.undoCheckIn(key, val) } />
      })

      //console.log({tmp_notCheckedIn});
      //console.log({notCheckedIn: this.state.notCheckedIn});
      //console.log({tmp_markedSafe});
      //console.log({markedSafe: this.state.markedSafe});

    }

    let totalList = notCheckedIn.concat(safepeople);
    return (
      <div className="container">
          <input type="text" className="searchBar" onChange={this.updateSearch.bind(this)} placeholder="Search" value={this.state.search} />
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
