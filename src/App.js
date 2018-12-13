import React, { Component } from 'react';
import './App.css';
import HttpsRedirect from 'react-https-redirect';
import * as Msal from 'msal';


// can ignore
var ContactDictionary = [
                          {name:"Rahm Nikyar", phone:4164164166},
                          {name:"Ellen Choi", phone:6476476477},
                          {name:"Bilal Ahmed", phone:9059059055},
                          {name:"Brian Yang", phone:3053053055}
                        ]

var applicationConfig = {
        // this is the id of our website, registered in Azure Active Directory (it runs sharepoint)
        clientID: 'adf1a6da-cc17-4863-885a-a2b6148aed42',
        // the URL/URI used to get authorization form microsoft and grant us an Access Token
        // it features a tenant id (for our website's azure directory), the client id, and more required parameters (mostly defaulted)
        // this built from default values             <----------------TENANT ID---------->                 other parameters required ->                                                      
        authority: 'https://login.microsoftonline.com/bdcc68fe-2692-4c7a-b7fe-ca9ff4385193/oauth2/authorize?client_id=adf1a6da-cc17-4863-885a-a2b6148aed42&response_type=id_token+token&scope=openid&redirect_uri=https://localhost:3000/&state=12345&nonce=random&response_mode=form_post',
        // this is the scope for the access token request call
        // open id is a default value required
        scope: ["openid "], 
        // SP END point is our sharepoint website (more specifically a list) 
        // this hasnt been tested yet, so it could be wrong
        spendpoint: "http://rahmnik.sharepoint.com/sites/DDSBlazeWFH/_api/web/lists/getbytitle('DDSB Contacts Info')",
    };



// copied from msal
var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, tokenReceivedCallback);

// our permissions for a sharepoint call, we just want to read right now
var spScopes = "[list.read]"
  
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
             console.log(accessToken);

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

// custom react login button component
class LoginButton extends Component {
  // initialization
  constructor(props) {
    //default initializer
    super(props);
    this.state = {};


    // binding the handle click function to this component,
    // this is required for react components, kinda weird, you can ignore
    this.handleClick = this.handleClick.bind(this);
  }



  // triggers the accesstoken granting flow
  handleClick() {
    getAccessToken();
  }


  render() {
    return (
    <div className='login-div'>
      <button className='login-button' onClick={this.handleClick}>
      <p>Login</p>
      </button>
    </div>);

  }
}

class App extends Component {

  render() {
    return (
      // dont mind these wrappers
      <HttpsRedirect>

      <LoginButton />

      </HttpsRedirect>);
  }
}



export default App;
