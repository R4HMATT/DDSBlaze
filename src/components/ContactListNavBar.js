import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import SwipeableViews from 'react-swipeable-views';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  AppBar: {
    backgroundColor: '#0483e8',
  },
  padding: {
    padding: "4px",
  },
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
    const notCheckedInTotal = this.props.notCheckedIn.length;
    const safePeopleTotal = this.props.safepeople.length;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="sticky" color="primary" classes={{colorPrimary: classes.AppBar}}>
            <Tabs variant="fullWidth" value={value} onChange={this.handleChange} indicatorColor="secondary">
              <Tab label={
                <Badge className={classes.padding} color="secondary" badgeContent={notCheckedInTotal} max={999}>
                  Not Checked-In
                </Badge>
              } />

              <Tab label={<Badge className={classes.padding} color="secondary" badgeContent={safePeopleTotal} max={999}>
                  Checked-In
                </Badge>
              } />
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
