import * as Msal from 'msal';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

//var exports = module.exports = {};


  var applicationConfig = {
        // this is the id of our website, registered in Azure Active Directory (it runs sharepoint)
        clientID: "adf1a6da-cc17-4863-885a-a2b6148aed42",
        //clientID: 'd162fed4-64b5-495d-8f10-e3bb4c0b9290',
        // the URL/URI used to get authorization form microsoft and grant us an Access Token
        // it features a tenant id (for our website's azure directory), the client id, and more required parameters (mostly defaulted)
        // this built from default values             <----------------TENANT ID---------->                 other parameters required ->                                                      
        authority: `https://login.microsoftonline.com/bdcc68fe-2692-4c7a-b7fe-ca9ff4385193/oauth2/authorize?client_id=adf1a6da-cc17-4863-885a-a2b6148aed42&response_type=id_token+token&scope=openid&redirect_uri=https://localhost:3000/&state=12345&nonce=random&response_mode=form_post`,
        // this is the scope for the access token request call
        // open id is a default value
        scope: ["Sites.Read.All"],
        // this gives u default user scopes? https://graph.microsoft.com/.default
        //spendpoint: "https://rahmnik.sharepoint.com/_api/web/lists/getbytitle('testlist')"
        spendpoint: "https://graph.microsoft.com/v1.0/sites/rahmnik.sharepoint.com/lists/testlist/items?expand=fields"
        //"https://rahmnik.sharepoint.com/sites/DDSBlazeWFH/_api/read"
        // SP END point is our sharepoint website (more specifically a list) 
        // this hasnt been tested yet, so it could be wrong
        //spendpoint: "https://rahmnik.sharepoint.com/sites/DDSBlazeWFH/_api/web/lists/getbytitle('DDSB Contacts Info')",
    };

    // copied from msal
var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, tokenReceivedCallback);



//callback function for redirect flows
// required fro implicit grant authorization flow
function tokenReceivedCallback(errorDesc, token, error, tokenType) {
    if (token) {
      // successful
      return (<Redirect to="/list" />);
    }
    // error checking
    else {
        console.log(error + ":" + errorDesc);
    }
}

// logging in
// body copied from msal examples
// this will get triggered when we click the login button
var getAccessToken = function () {
    console.log('getting access token');
    userAgentApplication.loginPopup(applicationConfig.scope).then(function (idToken) {
           //Login Success
           userAgentApplication.acquireTokenSilent(applicationConfig.scope).then(function (accessToken) {
               //AcquireTokenSilent Success
               console.log('Success');
               localStorage.setItem("accessToken", accessToken)
               console.log(accessToken);

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
           console.log("could not log in, MSAL function error")
           console.log(error);
       });
  }


export default getAccessToken;
