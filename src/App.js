import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import ContactList from './components/ContactList';
import ContactCard from './components/ContactCard.js';
class App extends Component{
  render() {
  return (
      <div>
        <ul>
          <li><Link to="/login">LoginPage</Link></li>
          <li><Link to="/contactlist">Contact List</Link></li>
        </ul>

        <Route path="/login" exact component={LoginPage}/>
        <Route path="/contactlist" component={ContactList}/>
        <Route path="/contactCard" render={(props) => <ContactCard {...props}/>}/>
      </div>
    );
    }
  }

export default App;
