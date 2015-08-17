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
    this.state = {
      pickedTeam: null,
      picks: props.picks,
      picksCache: props.picksCache,
    };
    this._showPicksPanel = this._showPicksPanel.bind(this);
    this._pickTeam = this._pickTeam.bind(this);
    this._closePicksPanel = this._closePicksPanel.bind(this);
    this._showStandingsPanel = this._showStandingsPanel.bind(this);
    this._onPicksPanelClose = this._onPicksPanelClose.bind(this);
    this._clearAllPicks = this._clearAllPicks.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }

  _clearAllPicks(e) {
    e.preventDefault();
    this.setState({
      picks: [{amount: 5,team: {name: '',abbr: ''}},{amount: 4,team: {name: '',abbr: ''}},{amount: 3,team: {name: '',abbr: ''}},{amount: 2,team: {name: '',abbr: ''}},{amount: 1,team: {name: '',abbr: ''}}],
      picksCache: {},
    });
  }

  _onPicksPanelClose() {
    // Uncaught TypeError: Cannot read property 'componentDidAppear' of undefined
    // this.setState({pickedTeam: null});
    setTimeout(() => {this.setState({pickedTeam: null});}, 0);
  }

  _closePicksPanel(e) {
    e.preventDefault();
    this.refs.picks.close();
  }

  _pickTeam(team, e) {
    e.preventDefault();
    this.setState({pickedTeam: team});
    this.refs.picks.open();
  }

  _showPicksPanel(e) {
    e.preventDefault();
    this.refs.picks.open();
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
          onNavClose={this._onPicksPanelClose}
          header={<Picks clearAllPicks={this._clearAllPicks} closePicksPanel={this._closePicksPanel} pickedTeam={this.state.pickedTeam} picks={this.state.picks} />}
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
        <Matchups picksCache={this.state.picksCache} pickTeam={this._pickTeam} matchups={this.props.matchups} />
      </div>
    );
  }

};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

Main.defaultProps = {
  matchups: [{away: {abbr: 'PIT',name: 'STEELERS'}, home: {abbr: 'NE',name: 'PATRIOTS'}},{away: {abbr: 'GB',name: 'PACKERS'}, home: {abbr: 'CHI',name: 'BEARS'}},{away: {abbr: 'KC',name: 'CHIEFS'}, home: {abbr: 'HOU',name: 'TEXANS'}},{away: {abbr: 'CLE',name: 'BROWNS'}, home: {abbr: 'NYJ',name: 'JETS'}},{away: {abbr: 'IND',name: 'COLTS'}, home: {abbr: 'BUF',name: 'BILLS'}},{away: {abbr: 'MIA',name: 'DOLPHINS'}, home: {abbr: 'WSH',name: 'REDSKINS'}},{away: {abbr: 'CAR',name: 'PANTHERS'}, home: {abbr: 'JAC',name: 'JAGUARS'}},{away: {abbr: 'SEA',name: 'SEAHAWKS'}, home: {abbr: 'STL',name: 'RAMS'}},{away: {abbr: 'NO',name: 'SAINTS'}, home: {abbr: 'ARI',name: 'CARDINALS'}},{away: {abbr: 'DET',name: 'LIONS'}, home: {abbr: 'SD',name: 'CHARGERS'}},{away: {abbr: 'TEN',name: 'TITANS'}, home: {abbr: 'TB',name: 'BUCCANEERS'}},{away: {abbr: 'CIN',name: 'BENGALS'}, home: {abbr: 'OAK',name: 'RAIDERS'}},{away: {abbr: 'BAL',name: 'RAVENS'}, home: {abbr: 'DEN',name: 'BRONCOS'}},{away: {abbr: 'NYG',name: 'GIANTS'}, home: {abbr: 'DAL',name: 'COWBOYS'}},{away: {abbr: 'PHI',name: 'EAGLES'}, home: {abbr: 'ATL',name: 'FALCONS'}},{away: {abbr: 'MIN',name: 'VIKINGS'}, home: {abbr: 'SF',name: '49ERS'}}],
  picks: [{amount: 5,team: {name: 'PATRIOTS',abbr: 'NE'}},{amount: 4,team: {name: 'SEAHAWKS',abbr: 'SEA'}},{amount: 3,team: {name: 'PACKERS',abbr: 'GB'}},{amount: 2,team: {name: 'COLTS',abbr: 'IND'}},{amount: 1,team: {name: 'COWBOYS',abbr: 'DAL'}}],
  picksCache: {'NE': 5, 'SEA': 4, 'GB': 3, 'IND': 2, 'DAL': 1},
  standings: [{name: 'Aaron Johnson', score: 10, initials: 'AJ'}, {name: 'Robin Mooers', score: 9, initials: 'RM'}, {name: 'Neal Anderson', score: 8, initials: 'NA'}, {name: 'Jason Wachter', score: 7, initials: 'JW'}, {name: 'Brent Schleicher', score: 6, initials: 'BS'}, {name: 'Jeff Austin', score: 5, initials: 'JA'}, {name: 'Ted Rightmire', score: 4, initials: 'TR'}],
};