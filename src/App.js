import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var ContactDictionary = [
                          {name:"Rahm Nikyar", phone:4164164166},
                          {name:"Ellen Choi", phone:6476476477},
                          {name:"Bilal Ahmed", phone:9059059055},
                          {name:"Brian Yang", phone:3053053055}
                        ]


class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render()  {
    return <div> {this.props.name} </div>
  }
}

class ContactList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts:[],
    }
  }

  generateContacts() {
    let contacts = [];

    for (let i=0; i < ContactDictionary.length; i++) {
      contacts.push(<Contact name={ContactDictionary[i].name}/>)
    }
    return contacts
  }

  render() {
    var contactwidgets = this.generateContacts();
    return (
      <div class="contact-list" id={this.props.list}>
      {contactwidgets}
      </div>

      )
  }

}

class App extends Component {


  render() {
    return <ContactList list="Checked In"/>;
  }
}

export default App;
