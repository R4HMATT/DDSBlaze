import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import "./ContactLoginInfo.css";

const styles = {
    Avatar: {
      margin: 10,
      width: 100,
      height: 100,
    },
  };

class ContactLoginInfo extends Component{

    render(){
        //src={require("./assets/default_profile_pic.png")}
        let userFullName = localStorage.getItem("userFullName");
        let userFirstName = localStorage.getItem("userFirstName");
        let userLastName = localStorage.getItem("userLastName");

        const { classes } = this.props;
        return(
            <div className="profilePicContainer">
                <Avatar className={classes.Avatar} alt="">{`${userFirstName[0]}${userLastName[0]}`}</Avatar>
                <h3>
                    {userFullName}
                </h3>
                <br/>
            </div>
        );
    }
}

export default withStyles(styles)(ContactLoginInfo);