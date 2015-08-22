import React from 'react';
import mui from 'material-ui';
import Gravatar from './gravatar';
import $ from 'jquery';
import './../stylesheets/account.scss';

let Dialog = mui.Dialog,
    TextField = mui.TextField,
    FlatButton = mui.FlatButton,
    Snackbar = mui.Snackbar,
    Avatar = mui.Avatar;

export default class Account extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isNewUser: false,
      authenticationError: '',
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._dismissAuthenticationError = this._dismissAuthenticationError.bind(this);
    this._setAuthenticationError = this._setAuthenticationError.bind(this);
  }

  _setAuthenticationError(authenticationError) {
    this.setState({authenticationError}, () => {
      this.refs.snackbar.show();
    });
  }

  _dismissAuthenticationError() {
    this.setState({authenticationError: ''}, () => {
      this.refs.snackbar.dismiss();
    });
  }

  _handleSubmit() {
    let url = 'http://localhost:8080/api/authenticate';
    let data = {};
    data.username = this.refs.username.getValue().trim();
    data.password = this.refs.password.getValue().trim();
    if (this.state.isNewUser) {
      url = 'http://localhost:8080/api/signup';
      data.full_name = this.refs.fullName.getValue().trim();
      data.email = this.refs.email.getValue().trim();
    }
    $.post(url, data).done((response) => {
      // check if success
      if (response.success) {
        this.props.setSignedIn(response);
        this._dismissAuthenticationError();
      } else {
        this._setAuthenticationError(response.message);
      }
    }).fail(() => {
      this._setAuthenticationError("An error occurred while trying to connect to the authentication server.");
    });
  }

  _toggleNewUser(e) {
    this.setState({
      isNewUser: !this.state.isNewUser,
    });
  }

  render() {
    let dialog_actions = [];
    let dialog_title = "Sign in";

    if (this.props.signedIn) {
      dialog_title = this.props.username;
      dialog_actions.push({text: 'Edit'});
      dialog_actions.push({text: 'Sign out', onTouchTap: this.props.signOut});
    } else {
      if (this.state.isNewUser) {
        dialog_title = "New user";
        dialog_actions.push(<FlatButton key="create-account" label="Create account" primary={true} onTouchTap={this._handleSubmit} />);
        dialog_actions.push({text: 'Back', onTouchTap: this._toggleNewUser.bind(this, false)});
      } else {
        dialog_actions.push(<FlatButton key="sign-in" label="Sign in" primary={true} onTouchTap={this._handleSubmit} />);
        dialog_actions.push({text: 'New user', onTouchTap: this._toggleNewUser.bind(this, true)});
      }
    }

    return (
      <div className="Account-container">
        <Dialog title={dialog_title} contentStyle={{width: '85%'}} ref="dialog" actions={dialog_actions} style={{top: '-70px'}}>
          <Snackbar
            className="authentication-error"
            ref="snackbar"
            message={this.state.authenticationError}
            action="Dismiss"
            onActionTouchTap={this._dismissAuthenticationError}/>
          { this.props.signedIn &&
            <div className="account">
              <div className="gravatar-parent">
                <Gravatar s={100} email={this.props.email} d="blank" fallBack={<Avatar size={100} className="avatar">{this.props.initials}</Avatar>} />
              </div>
              <div className="primary">{this.props.first_name}</div>
              <div className="secondary">{this.props.email}</div>
            </div>
          }
          { !this.props.signedIn &&
            <form>
              { this.state.isNewUser &&
                <div className="account-sign-up">
                  <TextField fullWidth={true} ref="fullName" hint="Full name" floatingLabelText="Full name" />
                  <TextField fullWidth={true} ref="email" hint="Email" floatingLabelText="Email" />
                  <TextField fullWidth={true} ref="username" hint="Choose your username" floatingLabelText="Choose your username" />
                  <TextField fullWidth={true} ref="password" type="password" hint="Create a password" floatingLabelText="Create a password" />
                </div>
              }
              { !this.state.isNewUser &&
                <div>
                  <TextField fullWidth={true} ref="username" hint="Username" floatingLabelText="Username" />
                  <TextField fullWidth={true} ref="password" type="password" hint="Password" floatingLabelText="Password" />
                </div>
              }
            </form>
          }
        </Dialog>
      </div>
    );
  }

};