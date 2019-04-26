import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './LoginPage.css';
import HttpsRedirect from 'react-https-redirect';
import getAccessToken from '../accessRequest.js';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

//var access = require('./accessRequest.js')
const https = require('https');
const SP = require(".././Connection.json");

//var sharepointSite = "https://rahmnik.sharepoint.com/sites/DDSBlazeWFH/_api/web/lists/getbytitle('DDSB Contacts Info')"
var sharepointSite = SP.sharepoint.list_address;

// Styles applied to Login button
const styles = theme => ({
  Button: {
    backgroundColor: '#4CAF50',
  }
});

class LoginPage extends Component {

  constructor(props) {
  //default initializer
  super(props);
  this.state = {
    token: false,
    isAuth: false,
    list: '',
    intervalIsSet: null,
    successSnack: 0,
    errorSnack: 0,
    userInfo: {},
    userPhoto: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.verifyAuth = this.verifyAuth.bind(this);

    this.getUserInfo = this.getUserInfo.bind(this);

    this.handleResponse = this.handleResponse.bind(this);
    this.deleteCookies = this.deleteCookies.bind(this);
  }

  // triggers the accesstoken granting flow
  handleClick() {
    let currToken = getAccessToken();

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

  componentDidMount() {
    this.verifyAuth();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.verifyAuth, 2000);
      this.setState({ intervalIsSet: interval });
    }
  };

  /** Allow a user to enter if they are authenticated with MS Graph */
  verifyAuth() {
    console.log({token: localStorage.getItem('accessToken')})
    this.setState({token: localStorage.getItem('accessToken')})
    
    if (localStorage.getItem('accessToken')) {

      var headers = new Headers();

      var bearer = "Bearer " + localStorage.getItem('accessToken')

      headers.append("Authorization", bearer);
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      var options = {
          method: "GET",
          headers: headers
      };

      fetch(SP.sharepoint.list_address, options)
        .then(response => this.handleResponse(response));
    } else{
      this.setState({isAuth: false});
      this.props.closeSnackbar(this.state.successSnack);
    }
    this.getUserInfo();
  }

  /**A function to fetch current user information such as name
   * () => object
   */
  getUserInfo(){
    const fetch = require('node-fetch');

    // If we have user's access token
    if(localStorage.getItem("accessToken")){
        var bearer = "Bearer " + this.state.token;
        var endpoint = "https://graph.microsoft.com/v1.0/me/"
        var options = {
            method: "GET",
            headers: {
                "Authorization": bearer,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        fetch(endpoint, options)
        .then(response => response.json())
        .then(res => {this.setState({userInfo: res})});
    }
  }

  /** Check if HTTP response is good or not
   * (object) => null
   */
  handleResponse(response){
    let newSnack = 0;
    if(response.ok){
      // Close any existing error snackbars and open success one
      this.props.closeSnackbar(this.state.errorSnack);

      newSnack = this.props.enqueueSnackbar("Successfully Logged-in", {
        variant: "success",
        autoHideDuration: 10000,
        preventDuplicate: true,
        persist: true,
      });

      this.setState({successSnack: newSnack});
      this.setState({isAuth: true});

    } else{
      // Close any existing success snackbars and open new error one
      this.props.closeSnackbar(this.state.successSnack);

      // Remove all cookies and access token
      localStorage.removeItem("accessToken");
      this.deleteCookies();
      this.setState({isAuth: false});

      newSnack = this.props.enqueueSnackbar("You are not authorized to access this resource", {
        variant: "error",
        autoHideDuration: 10000,
        preventDuplicate: true,
        persist: true,
        action: (
            <Button size="small" variant="outlined" color="inherit">Dismiss</Button>
        ),
      });

      this.setState({errorSnack: newSnack});
    }
  }

  /** Remove all cookies from client side */
  deleteCookies(){
    let cookies = document.cookie.split(";");

    for(let i = 0; i < cookies.length; i++){
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookies.substr(0, eqPos) : cookies;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  render() {

    // Store the logged-in person's name
    localStorage.setItem("userFullName", this.state.userInfo.displayName);
    localStorage.setItem("userFirstName", this.state.userInfo.givenName);
    localStorage.setItem("userLastName", this.state.userInfo.surname);

    const {classes} = this.props;
    return (
      <HttpsRedirect>
        <div className="container">
          <div className="header">
            <h1>Welcome to <strong>DDSBlaze!</strong></h1>
            <br/>
            <h4>Click Login to get started.</h4>
          </div>
          <div className="buttonsContainer">
            <div className='login-button'>
              <Button onClick={this.handleClick} variant="contained" color="primary" classes={{containedPrimary: classes.Button}}>
                  Login
              </Button>
            </div>

            <div className='contactList-button'>
              <Button variant="contained" href="/contactList" disabled={!this.state.isAuth}>
                  Contact List
              </Button>
            </div>
          </div>
         </div>
      </HttpsRedirect>
      );
  }

}

export default withSnackbar(withStyles(styles)(LoginPage));
