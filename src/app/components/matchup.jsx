import React from 'react';
import mui from 'material-ui';
import './../stylesheets/matchup.scss';

let Paper = mui.Paper,
    FlatButton = mui.FlatButton;

export default class Matchup extends React.Component {

  constructor(props) {
    super();
  }

  render() {

    return (
      <div className="Matchup-container">
        <Paper>
          <FlatButton className="matchup-away-team">{this.props.away}</FlatButton>
          <div className="matchup-at">AT</div>
          <FlatButton className="matchup-home-team">{this.props.home}</FlatButton>
        </Paper>
      </div>
    );
  }

};
