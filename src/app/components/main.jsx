import React from 'react';
import mui from 'material-ui';
import Picks from './picks.jsx';
import Standings from './standings.jsx';
import Matchups from './matchups.jsx';
import './../stylesheets/main.scss';

let ThemeManager = new mui.Styles.ThemeManager();
let AppBar = mui.AppBar,
    IconButton = mui.IconButton,
    SvgIcon = mui.SvgIcon,
    MenuItem = mui.MenuItem,
    Colors = mui.Styles.Colors,
    LeftNav = mui.LeftNav;

export default class Main extends React.Component {

  constructor(props) {
    super();
    this._showPicksPanel = this._showPicksPanel.bind(this);
    this._showStandingsPanel = this._showStandingsPanel.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }

  _showPicksPanel(e) {
    e.preventDefault();

    this.refs.picks.toggle();
  }

  _showStandingsPanel(e) {
    e.preventDefault();

    this.refs.standings.toggle();
  }

  componentWillMount() {
    // ThemeManager.setPalette({
    //   primary1Color: Colors.grey500,
    // });
  }

  render() {

    return (
      <div className="Main-container">
        <LeftNav
          ref="picks"
          docked={false}
          header={<Picks picks={this.props.picks} />}
          menuItems={[]} />
        <LeftNav
          ref="standings"
          docked={false}
          header={<Standings standings={this.props.standings} />}
          menuItems={[]} />
        <AppBar
          iconClassNameLeft="material-icons picks-icon"
          iconClassNameRight="material-icons standings-icon"
          onLeftIconButtonTouchTap={this._showPicksPanel}
          onRightIconButtonTouchTap={this._showStandingsPanel}
          title="Pick Taco"/>
        <Matchups matchups={this.props.matchups} />
      </div>
    );
  }

};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

Main.defaultProps = {
  matchups: [{away: 'PIT', home: 'NE'},{away: 'GB', home: 'CHI'},{away: 'KC', home: 'HOU'},{away: 'CLE', home: 'NYJ'},{away: 'IND', home: 'BUF'},{away: 'MIA', home: 'WAS'},{away: 'CAR', home: 'JAC'},{away: 'SEA', home: 'STL'},{away: 'NO', home: 'ARI'},{away: 'DET', home: 'SD'},{away: 'TEN', home: 'TB'},{away: 'CIN', home: 'OAK'},{away: 'BAL', home: 'DEN'},{away: 'NYG', home: 'DAL'},{away: 'PHI', home: 'ATL'},{away: 'MIN', home: 'SF'}],
  picks: [{amount: 5, team: 'Patriots'},{amount: 4, team: 'Seahawks'},{amount: 3, team: 'Packers'},{amount: 2, team: 'Colts'},{amount: 1, team: 'Cowboys'}],
  standings: [{name: 'Aaron Johnson', score: 10, initials: 'AJ'}, {name: 'Robin Mooers', score: 9, initials: 'RM'}, {name: 'Neal Anderson', score: 8, initials: 'NA'}, {name: 'Jason Wachter', score: 7, initials: 'JW'}, {name: 'Brent Schleicher', score: 6, initials: 'BS'}, {name: 'Jeff Austin', score: 5, initials: 'JA'}, {name: 'Ted Rightmire', score: 4, initials: 'TR'}],
};