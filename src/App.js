import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import ContactList from './components/ContactList';
import ContactCard from './components/ContactCard.js';

//<Route path="/login" exact component={LoginPage}/>

class App extends Component{
  render() {
  return (

      <div>
        <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/contactList" component={ContactList}/>
        <Route path="/contactCard/:id" component={ContactCard}/>
        <Route path="/emergencyContact/:id" component={ContactCard}/>
        </Switch>
      </div>
    );
    }
  }

export default App;
