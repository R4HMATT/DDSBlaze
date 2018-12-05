import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var ContactDictionary = [
                          {name:"Rahm Nikyar", phone:4164164166},
                          {name:"Ellen Choi", phone:6476476477},
                          {name:"Bilal Ahmed", phone:9059059055},
                          {name:"Brian Yang", phone:3053053055}
                        ]



function StatusButton(props){
    return (                      //()=> should be function() {alert('click');}
      <button style={props.color} className="status-button" onClick={() => props.onClick()}>
      </button>
    );
}

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false
    }
  };

  // binding handleclick to this by using arrow function
  handleClick () {
    this.setState({check: !this.state.check})
  };

  render()  {
    let checkedIn = {backgroundColor: 'green'}
    let notCheckedIn = {backgroundColor: 'red'}

    return (
      <div class="contact-widget">
        <p>{this.props.name}</p>
        <StatusButton 
        color= {this.state.check ? checkedIn : notCheckedIn} 
        onClick= {() => this.handleClick()}
        />
      </div>
    )
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
