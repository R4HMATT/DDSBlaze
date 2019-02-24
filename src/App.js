import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import ContactCard from './components/ContactCard.js';
import LoginPage from './loginPage';
import ContactList from './ContactList';

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/login">LoginPage</Link></li>
          <li><Link to="/contactlist">Contact List</Link></li>
        </ul>

        <Route path="/login" exact component={LoginPage}/>
        <Route path="/contactlist" component={ContactList}/>
      </div>
    );
  }
}

export default App;
