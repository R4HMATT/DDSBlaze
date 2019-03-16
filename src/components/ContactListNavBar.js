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

class ContactListNavBar extends React.Component {
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
          <AppBar position="static" color="primary">
            <Tabs variant="fullWidth" value={value} onChange={this.handleChange} indicatorColor="secondary">
              <LinkTab label="Not Checked-In" />
              <LinkTab label="Checked-In" />
            </Tabs>
          </AppBar>
        {value === 0 && <div>Not Checked-In</div>}
        {value === 1 && <div>Checked-In</div>}
        </div>
      </NoSsr>
    );
  }
}

ContactListNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactListNavBar);
