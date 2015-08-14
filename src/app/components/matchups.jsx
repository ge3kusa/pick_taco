import React from 'react';
import mui from 'material-ui';
import Matchup from './matchup.jsx';
import './../stylesheets/matchups.scss';

let List = mui.List,
    ListItem = mui.ListItem;

export default class Matchups extends React.Component {

  constructor(props) {
    super();
  }

  render() {

    return (
      <div className="Matchups-container">
        <List subheader="Week 1 Matchups">
          <List className="matchups-left-list">
            <Matchup away="NE" home="PIT" />
          </List>
          <List className="matchups-right-list">
            <Matchup away="MIN" home="SF" />
          </List>
        </List>
      </div>
    );
  }

};
