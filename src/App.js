import React, { Component } from 'react';
import './App.css';
import HttpsRedirect from 'react-https-redirect';
import * as Msal from 'msal';

const https = require('https');


//var sharepointSite = "https://rahmnik.sharepoint.com/sites/DDSBlazeWFH/_api/web/lists/getbytitle('DDSB Contacts Info')"
var sharepointSite = "https://graph.microsoft.com/v1.0/sites/rahmnik.sharepoint.com/lists/testlist/items?expand=fields";


var contactListURI = sharepointSite + "getbytitle('/DDSB Contacts Info')/items"


// can ignore
var ContactDictionary = [
                          {name:"Rahm Nikyar", phone:4164164166},
                          {name:"Ellen Choi", phone:6476476477},
                          {name:"Bilal Ahmed", phone:9059059055},
                          {name:"Brian Yang", phone:3053053055}
                        ]

// will be required for the authentication for making sharepoint calls
var appSecret = "p2A7bksC2qIuJk4P1P6h4AqpiS4MPfqv23Iyo7W9d0U="

  var applicationConfig = {
        // this is the id of our website, registered in Azure Active Directory (it runs sharepoint)
        clientID: 'adf1a6da-cc17-4863-885a-a2b6148aed42',
        //clientID: 'd162fed4-64b5-495d-8f10-e3bb4c0b9290',
        // the URL/URI used to get authorization form microsoft and grant us an Access Token
        // it features a tenant id (for our website's azure directory), the client id, and more required parameters (mostly defaulted)
        // this built from default values             <----------------TENANT ID---------->                 other parameters required ->                                                      
        authority: 'https://login.microsoftonline.com/bdcc68fe-2692-4c7a-b7fe-ca9ff4385193/oauth2/authorize?client_id=adf1a6da-cc17-4863-885a-a2b6148aed42&response_type=id_token+token&scope=openid&redirect_uri=https://localhost:3000/&state=12345&nonce=random&response_mode=form_post',
        /** authority: 'https://rahmnik.sharepoint.com/_layouts/15/OAuthorize.aspx' +
        '?IsDlg=1&amp;client_id=d162fed4-64b5-495d-8f10-e3bb4c0b9290' +
        '&amp;scope=list.read;response_type=code' + 
        '&amp;redirect_uri=https://localhost:3000/',
        **/
        // this is the scope for the access token request call
        // open id is a default value required
        //scope: ["openid"], 
        scope: ["Sites.Read.All"],
        // this gives u default user scopes? https://graph.microsoft.com/.default
        //spendpoint: "https://rahmnik.sharepoint.com/_api/web/lists/getbytitle('testlist')"
        spendpoint: "https://graph.microsoft.com/v1.0/sites/rahmnik.sharepoint.com/lists/testlist/items?expand=fields"
        //"https://rahmnik.sharepoint.com/sites/DDSBlazeWFH/_api/read"
        // SP END point is our sharepoint website (more specifically a list) 
        // this hasnt been tested yet, so it could be wrong
        //spendpoint: "https://rahmnik.sharepoint.com/sites/DDSBlazeWFH/_api/web/lists/getbytitle('DDSB Contacts Info')",
    };


var globaltoken = '';

// copied from msal
var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, tokenReceivedCallback);

// our permissions for a sharepoint call, we just want to read right now
var spScopes = "[list.read]"


function getSPlist2(token) {

  if (!token) {
    console.log("token validation done");
    var headers = new Headers();
    console.log(typeof(token));
    var bearer = "Bearer " + token;
    console.log({"bearer": bearer});
    headers.append("Authorization", bearer);
    var options = {
        method: "GET",
        headers: headers
      };

    var list;
    fetch(sharepointSite, options)
      .then(response => response.json)
      .then( res => console.log({SPListResult: res}));

  }
};



//callback function for redirect flows
// required fro implicit grant authorization flow
function tokenReceivedCallback(errorDesc, token, error, tokenType) {
    if (token) {
      // successful
      console.log(token)
    }
    // error checking
    else {
        console.log(error + ":" + errorDesc);
    }
}

// logging in
// body copied from msal examples
// this will get triggered when we click the login button
function getAccessToken() {
  console.log('getting access token');
  userAgentApplication.loginPopup(applicationConfig.scope).then(function (idToken) {
         //Login Success
         userAgentApplication.acquireTokenSilent(applicationConfig.scope).then(function (accessToken) {
             //AcquireTokenSilent Success
             console.log('Success');
             globaltoken = accessToken
             localStorage.setItem("accessToken", accessToken)
             console.log(accessToken);
             getSPlist2(accessToken);
             return accessToken;
             //return accessToken;

         }, function (error) {
             //AcquireTokenSilent Failure, send an interactive request.
             userAgentApplication.acquireTokenPopup(applicationConfig.scope).then(function (accessToken) {
                 //updateUI();
             }, function (error) {
                 console.log(error);
             });
         })
     }, function (error) {
         //login failure
         console.log(error);
     });
}


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
