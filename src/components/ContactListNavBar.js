import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';

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
    backgroundColor: "white",
  },
  AppBar: {
    backgroundColor: '#0483e8',
  }
});

/*** This class handles switching between people who are Checked-In and NOT Checked-In ***/
class ContactListNavBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({index,});
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="sticky" color="primary" classes={{colorPrimary: classes.AppBar}}>
            <Tabs variant="fullWidth" value={value} onChange={this.handleChange} indicatorColor="secondary">
              <LinkTab label="Not Checked-In" />
              <LinkTab label="Checked-In" />
            </Tabs>
          </AppBar>
          <SwipeableViews disabled={true} index={value} onChangeIndex={this.handleChange} axis={value === 0 ? 'x-reverse' : 'x'}>
            {value === 0 && <div>{this.props.notCheckedIn}</div>}
            {value === 1 && <div>{this.props.safepeople}</div>}
          </SwipeableViews>
        </div>
      </NoSsr>
    );
  }
}

ContactListNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactListNavBar);
