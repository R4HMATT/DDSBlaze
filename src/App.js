import React, { Component } from 'react';
import './App.css';
import HttpsRedirect from 'react-https-redirect';

import getAccessToken from './accessRequest.js';

//var access = require('./accessRequest.js')
const https = require('https');


//var sharepointSite = "https://rahmnik.sharepoint.com/sites/DDSBlazeWFH/_api/web/lists/getbytitle('DDSB Contacts Info')"
var sharepointSite = "https://graph.microsoft.com/v1.0/sites/rahmnik.sharepoint.com/lists/testlist/items?expand=fields";



class DisplaySPInfo extends Component {
  // initialization
  constructor(props) {
    //default initializer
    let currText = localStorage.getItem("accessToken");
    if (currText === null) {
      currText = "Not Logged in yet"
    }
    super(props);
    this.state = {
      text: currText,
    };
  }


  componentDidUpdate(prevProps) {
      /*// Typical usage (don't forget to compare props):
    if (this.props.token !== prevProps.token) {
      this.fetchData(this.props.token);
      console.log(this.props.token);
    }*/

    console.log('display info updated'); 
    console.log(this.props.token);
    if (this.props.token) {

      //fetch
      console.log("make the sp request!")

    }
  }


  render() {
    return (
    <div className='sp-display'>
      <p>{this.state.text}</p>
    </div>);

  }
}

class Page extends Component {

  constructor(props) {
  //default initializer
  super(props);
  this.state = {
    token: false,
    list: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.getSPlist = this.getSPlist.bind(this);
  }



  // triggers the accesstoken granting flow
  handleClick() {
    let currToken = getAccessToken();


    // trying conventional http request
    /* https.get('https://rahmnik.sharepoint.com/_layouts/15/OAuthorize.aspx' +
      '?IsDlg=1&amp;client_id=d162fed4-64b5-495d-8f10-e3bb4c0b9290' +
      '&amp;scope=list.read;response_type=code' + 
      '&amp;redirect_uri=https://localhost:3000/', (resp) => {

      let data = '';

      resp.on('data', (chunk) => {

        data += chunk;
      });

      resp.on('end', () => {
        console.log(JSON.parse(data).explanation);

      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    */

  
    console.log('token after callback is' + currToken)
    this.setState({token: currToken})
    //this.props.callBack(token);
  }

  returnToken = (dataFromChild) => {
    console.log('callback activated')
    this.setState({
      token: dataFromChild, 
    });
    console.log(dataFromChild);
  }

  componentDidUpdate() {
    console.log('page updated')
    if (this.state.token) {
      //console.log(this.state.token);
    }
  }

  getSPlist() {
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
      var options = {
          method: "GET",
          headers: headers
      };

      var list;
      fetch(sharepointSite, options)
        .then(response => response.json)
        .then( res => this.setState({list: res}));
        console.log(this.state.list);

    }
  }

  render() {


    return (
      <React.Fragment>
      <button onClick={this.handleClick} className='login-button'>
      Login
      </button>


      <button onClick={this.getSPlist} className='login-button'>
       Yeet
      </button>
      {this.state.list}
      <DisplaySPInfo token={this.state.token}/>
      </React.Fragment>
      );
  }

}

class App extends Component {


  render() {
    return (
      // dont mind these wrappers
      <HttpsRedirect>
      <Page />
      </HttpsRedirect>);
  }
}


export default App;
