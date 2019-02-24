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
      filtered: [],
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

  checkIn(index) {
    let notCheckedInArr = this.state.notCheckedIn;
    let markedSafeArr = this.state.markedSafe;
    let temp = notCheckedInArr[index];
    notCheckedInArr.splice(index, 1);
    markedSafeArr.push(temp);
    this.setState({ markedSafe: markedSafeArr })
    this.setState({ notCheckedIn: notCheckedInArr })
    
  }

  undoCheckIn(index) {
    let notCheckedInArr = this.state.notCheckedIn;
    let markedSafeArr = this.state.markedSafe;
    let temp = markedSafeArr[index];
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
      return <CheckedIn key={key} text={val} deleteMethod={ (notCheckedIn) => this.checkIn(key) } 
      />
    })

    // List of all safely checked-in people
    let safepeople = this.state.markedSafe.map((val, key) => {
      return <MarkedSafe key={key} text={val} deleteMethod={ (markedSafe) => this.undoCheckIn(key) } />
    })

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
