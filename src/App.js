import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import ContactList from './components/ContactList';
import ContactCard from './components/ContactCard.js';
import ContactListNavBar from './components/ContactListNavBar';

class App extends Component{
  render() {
  return (
      <div>
        <ul>
          <li><Link to="/login">LoginPage</Link></li>
          <li><Link to="/contactList">Contact List</Link></li>
        </ul>

        <Route path="/login" exact component={LoginPage}/>
        <Route path="/contactList" component={ContactListNavBar}/>
        <Route path="/contactCard/:id" component={ContactCard}/>
        <Route path="/emergencyContact/:id" component={ContactCard}/>
      </div>
    );
    }
  }

export default App;
