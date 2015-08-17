import React from 'react';
import mui from 'material-ui';
import './../stylesheets/matchup.scss';

let Paper = mui.Paper,
    Avatar = mui.Avatar,
    FontIcon = mui.FontIcon,
    FlatButton = mui.FlatButton;

export default class Matchup extends React.Component {

  constructor(props) {
    super();
  }

  _pickTeam(team, e) {
    this.props.pickTeam(team, e)
  }

  render() {

    let away_slot = this.props.picksCache.hasOwnProperty(this.props.matchup.away.abbr) ? this.props.picksCache[this.props.matchup.away.abbr] : null;
    let home_slot = this.props.picksCache.hasOwnProperty(this.props.matchup.home.abbr) ? this.props.picksCache[this.props.matchup.home.abbr] : null;
    let away_icon_className = "material-icons pick-" + away_slot + "-icon";
    let home_icon_className = "material-icons pick-" + home_slot + "-icon";

    return (
      <div className="Matchup-container">
        <Paper className="matchup-parent">
          <div className="matchup-away">
            <FlatButton disabled={away_slot !== null} onClick={this._pickTeam.bind(this, this.props.matchup.away)}>
              { away_slot !== null &&
                <FontIcon className={away_icon_className} />
              }
              { away_slot === null &&
                <img src={"images/" + this.props.matchup.away.abbr + ".png"} />
              }
              <div className="team">{this.props.matchup.away.name}</div>
            </FlatButton>
          </div>
          <div className="matchup-at">AT</div>
          <div className="matchup-home">
            <FlatButton disabled={home_slot !== null} onClick={this._pickTeam.bind(this, this.props.matchup.home)}>
              { home_slot !== null &&
                <FontIcon className={home_icon_className} />
              }
              { home_slot === null &&
                <img src={"images/" + this.props.matchup.home.abbr + ".png"} />
              }
              <div className="team">{this.props.matchup.home.name}</div>
            </FlatButton>
          </div>
        </Paper>
      </div>
    );
  }

};
