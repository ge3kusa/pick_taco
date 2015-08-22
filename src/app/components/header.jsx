import React from 'react';
import mui from 'material-ui';
import Gravatar from './gravatar';
import './../stylesheets/header.scss';

let AppBar = mui.AppBar,
    FontIcon = mui.FontIcon,
    Avatar = mui.Avatar,
    Tab = mui.Tab,
    Tabs = mui.Tabs;

export default class Header extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="Header-container">
        <AppBar
          title="Pick Taco"
          iconClassNameLeft="material-icons picks-icon"
          onLeftIconButtonTouchTap={this.props.showPicksPanel}>
          { this.props.signedIn &&
            <Gravatar onClick={this.props.showAccountDialog} s={36} email={this.props.email} d="blank" fallBack={<Avatar size={36} className="avatar">{this.props.initials}</Avatar>} />
          }
          { !this.props.signedIn &&
            <FontIcon onClick={this.props.showAccountDialog} color="#FFFFFF" className="material-icons account-icon" />
          }
        </AppBar>
        <Tabs onChange={this.props.changeMainView}>
          <Tab label="Matchups" />
          <Tab label="Standings" />
        </Tabs>
      </div>
    );
  }

};