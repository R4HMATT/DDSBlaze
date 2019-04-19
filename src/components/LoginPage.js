import React, { Component } from 'react';
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
    };

    this.handleClick = this.handleClick.bind(this);
    this.verifyAuth = this.verifyAuth.bind(this);
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
      let interval = setInterval(this.verifyAuth, 500);
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
    }
  }

  /** Check if HTTP response is good or not
   * (object) => null
   */
  handleResponse(response){
    if(response.ok){
      this.setState({isAuth: true});
      this.props.enqueueSnackbar("Successfully Logged-in", {
        variant: "success",
        autoHideDuration: 10000,
        preventDuplicate: true,
        persist: true,
      });

    } else{
      
      // Remove all cookies and access token
      localStorage.removeItem("accessToken");
      this.deleteCookies();

      const key = this.props.enqueueSnackbar("You are not authorized to access this resource", {
        variant: "error",
        autoHideDuration: 10000,
        preventDuplicate: true,
        persist: true,
        action: (
            <Button size="small" variant="outlined" color="inherit">Dismiss</Button>
        ),
      });
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
