import React from 'react';
import mui from 'material-ui';
import Matchup from './matchup.jsx';

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
          {this.props.matchups.map((matchup, index) => {
            return <Matchup picksCache={this.props.picksCache} pickTeam={this.props.pickTeam} matchup={matchup} key={index} />;
          })}
        </List>
      </div>
    );
  }

};
