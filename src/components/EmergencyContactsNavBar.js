import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ContactCardInfo from "./ContactCardInfo";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class EmergencyContactsNavBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <div className={classes.root}>
        {value === 0 && <ContactCardInfo user_id={this.props.user_id}/>}
        {value === 1 && <ContactCardInfo user_id={this.props.emerg_contact_id}/>}
          <AppBar position="static" color="primary">
            <Tabs variant="fullWidth" value={value} onChange={this.handleChange} indicatorColor="secondary">
              <LinkTab label="Primary Contact" />
              <LinkTab label={this.props.emerg_contact_id} />
            </Tabs>
          </AppBar>
        </div>
      </NoSsr>
    );
  }
}

EmergencyContactsNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmergencyContactsNavBar);
