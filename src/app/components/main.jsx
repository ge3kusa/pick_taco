import React from 'react';
import mui from 'material-ui';
import Picks from './picks';
import Standings from './standings';
import Matchups from './matchups';
import Header from './header';
import Account from './account';

import './../stylesheets/main.scss';

let ThemeManager = new mui.Styles.ThemeManager();
let MenuItem = mui.MenuItem,
    Colors = mui.Styles.Colors,
    LeftNav = mui.LeftNav;

export default class Main extends React.Component {

  constructor(props) {
    super();
    this.state = {
      pickedTeam: null,
      picks: props.picks,
      picksCache: props.picksCache,
      mainView: 'matchups',
      signedIn: this._getAuthToken() === null ? false : true,
    };
    this._showPicksPanel = this._showPicksPanel.bind(this);
    this._pickTeam = this._pickTeam.bind(this);
    this._closePicksPanel = this._closePicksPanel.bind(this);
    this._changeMainView = this._changeMainView.bind(this);
    this._onPicksPanelClose = this._onPicksPanelClose.bind(this);
    this._clearAllPicks = this._clearAllPicks.bind(this);
    this._changePick = this._changePick.bind(this);
    this._showAccountDialog = this._showAccountDialog.bind(this);
    this._setSignedIn = this._setSignedIn.bind(this);
    this._signOut = this._signOut.bind(this);
  }

  _getAuthToken() {
    return localStorage.getItem("token");
  }

  _getUserInfo() {
    let user = {};
    let name_arr = localStorage.getItem("full_name").split(" ");
    user.username = localStorage.getItem("username");
    user.email = localStorage.getItem("email");
    user.full_name = localStorage.getItem("full_name");
    user.first_name = name_arr[0];
    user.initials = user.first_name[0] + (name_arr.length > 1 ? user.full_name.split(" ")[1][0] : '');
    return user;
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }

  _setPicksFromPicksCache(picksCache) {
    let _picks = [{amount: 5,team: {name: '',abbr: ''}},{amount: 4,team: {name: '',abbr: ''}},{amount: 3,team: {name: '',abbr: ''}},{amount: 2,team: {name: '',abbr: ''}},{amount: 1,team: {name: '',abbr: ''}}]
    Object.keys(picksCache).forEach(pick => {
      _picks[(5-picksCache[pick].amount)] = {amount: picksCache[pick].amount, team: {name: picksCache[pick].name, abbr: pick}}
    });
    return _picks;
  }

  _changePick(pick_data) {
    let _picksCache = this.state.picksCache,
        old_team = pick_data.old_team,
        new_team = pick_data.new_team,
        amount = pick_data.amount;

    // pick_data = {old_team, new_team, amount}
    if (pick_data.hasOwnProperty('old_team') && pick_data.hasOwnProperty('new_team')) {
      // REPLACE
      _picksCache[new_team.abbr] = {name: new_team.name, amount: amount};
      delete _picksCache[old_team.abbr];
    }
    if (pick_data.hasOwnProperty('old_team') && !pick_data.hasOwnProperty('new_team')) {
      // CLEAR
      delete _picksCache[old_team.abbr];
    }
    if (pick_data.hasOwnProperty('new_team') && !pick_data.hasOwnProperty('old_team')) {
      // CHOOSE
      _picksCache[new_team.abbr] = {name: new_team.name, amount: amount};
    }
    this.setState({
      pickedTeam: null,
      picksCache: _picksCache,
      picks: this._setPicksFromPicksCache(_picksCache),
    });
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

  _setSignedIn(response, e) {
    this.setState({
      signedIn: true,
    });
    localStorage.setItem("token", response.token);
    localStorage.setItem("full_name", response.user.full_name);
    localStorage.setItem("email", response.user.email);
    localStorage.setItem("username", response.user.username);
  }

  _showPicksPanel(e) {
    e.preventDefault();
    this.refs.picks.open();
  }

  _changeMainView(tab, view) {
    this.setState({
      mainView: view.props.label.toLowerCase(),
    });
  }

  _showAccountDialog(e) {
    e.preventDefault();
    this.refs.account.refs.dialog.show();
  }

  _signOut() {
    this.setState({
      signedIn: false,
    });
    localStorage.removeItem("token");
  }

  componentWillMount() {
    // ThemeManager.setPalette({
    //   primary1Color: Colors.amber300,
    // });
  }

  render() {

    return (
      <div className="Main-container">
        <LeftNav
          ref="picks"
          docked={false}
          onNavClose={this._onPicksPanelClose}
          header={<Picks changePick={this._changePick} clearAllPicks={this._clearAllPicks} closePicksPanel={this._closePicksPanel} pickedTeam={this.state.pickedTeam} picks={this.state.picks} />}
          menuItems={[]} />
        <Account {...this._getUserInfo()} signOut={this._signOut} setSignedIn={this._setSignedIn} ref="account" signedIn={this.state.signedIn} />
        <Header {...this._getUserInfo()} signedIn={this.state.signedIn} showAccountDialog={this._showAccountDialog} mainView={this.state.mainView} changeMainView={this._changeMainView} showPicksPanel={this._showPicksPanel} />
        { this.state.mainView === "standings" &&
          <div>
            <Standings indexPad={1} standings={this.props.standings_left} />
            { this.props.standings_right.length &&
              <Standings indexPad={this.props.standings_left.length+1} standings={this.props.standings_right} />
            }
          </div>
        }
        { this.state.mainView === "matchups" &&
          <div>
            <Matchups picksCache={this.state.picksCache} pickTeam={this._pickTeam} matchups={this.props.matchups_left} />
            { this.props.matchups_right.length &&
              <Matchups picksCache={this.state.picksCache} pickTeam={this._pickTeam} matchups={this.props.matchups_right} />
            }
          </div>
        }
      </div>
    );
  }

};

Main.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

Main.defaultProps = {
  matchups_left: [{away: {abbr: 'PIT',name: 'STEELERS'}, home: {abbr: 'NE',name: 'PATRIOTS'}},{away: {abbr: 'GB',name: 'PACKERS'}, home: {abbr: 'CHI',name: 'BEARS'}},{away: {abbr: 'KC',name: 'CHIEFS'}, home: {abbr: 'HOU',name: 'TEXANS'}},{away: {abbr: 'CLE',name: 'BROWNS'}, home: {abbr: 'NYJ',name: 'JETS'}},{away: {abbr: 'IND',name: 'COLTS'}, home: {abbr: 'BUF',name: 'BILLS'}},{away: {abbr: 'MIA',name: 'DOLPHINS'}, home: {abbr: 'WSH',name: 'REDSKINS'}},{away: {abbr: 'CAR',name: 'PANTHERS'}, home: {abbr: 'JAC',name: 'JAGUARS'}},{away: {abbr: 'SEA',name: 'SEAHAWKS'}, home: {abbr: 'STL',name: 'RAMS'}}],
  matchups_right: [{away: {abbr: 'NO',name: 'SAINTS'}, home: {abbr: 'ARI',name: 'CARDINALS'}},{away: {abbr: 'DET',name: 'LIONS'}, home: {abbr: 'SD',name: 'CHARGERS'}},{away: {abbr: 'TEN',name: 'TITANS'}, home: {abbr: 'TB',name: 'BUCCANEERS'}},{away: {abbr: 'CIN',name: 'BENGALS'}, home: {abbr: 'OAK',name: 'RAIDERS'}},{away: {abbr: 'BAL',name: 'RAVENS'}, home: {abbr: 'DEN',name: 'BRONCOS'}},{away: {abbr: 'NYG',name: 'GIANTS'}, home: {abbr: 'DAL',name: 'COWBOYS'}},{away: {abbr: 'PHI',name: 'EAGLES'}, home: {abbr: 'ATL',name: 'FALCONS'}},{away: {abbr: 'MIN',name: 'VIKINGS'}, home: {abbr: 'SF',name: '49ERS'}}],
  picks: [{amount: 5,team: {name: 'PATRIOTS',abbr: 'NE'}},{amount: 4,team: {name: 'SEAHAWKS',abbr: 'SEA'}},{amount: 3,team: {name: 'PACKERS',abbr: 'GB'}},{amount: 2,team: {name: 'COLTS',abbr: 'IND'}},{amount: 1,team: {name: 'COWBOYS',abbr: 'DAL'}}],
  picksCache: {'NE': {name: 'PATRIOTS', amount: 5}, 'SEA': {name: 'SEAHAWKS', amount: 4}, 'GB': {name: 'PACKERS', amount: 3}, 'IND': {name: 'COLTS', amount: 2}, 'DAL': {name: 'COWBOYS', amount: 1}},
  standings_left:[{name:'Aaron Johnson',score:10,email:'ifartwhenipee@gmail.com',initials:'AJ'},{name:'Robin Mooers',score:9,email:'rdmooers@gmail.com',initials:'RM'},{name:'Neal Anderson',score:8,email:'n.j.anderson@gmail.com',initials:'NA'},{name:'Jason Wachter',score:7,email:'jason.wachter@gmail.com',initials:'JW'},{name:'Brent Schleicher',score:6,email:'baschleicher@gmail.com',initials:'BA'},{name:'Jeff Austin',score:5,email:'jeff.austinjr@gmail.com',initials:'JA'},{name:'Ted Rightmire',score:4,email:'tedrightmire@gmail.com',initials:'TR'}],
  standings_right:[{name:'Ryan Arneson',score:3,email:'arneson@gmail.com',initials:'RA'},{name:'Jason Kadrmas',score:2,email:'blackjk@gmail.comj',initials:'JK'},{name:'Jacob Johnson',score:2,email:'jake.johnson9@gmail.com',initials:'JJ'},{name:'Sam Bradley',score:1,email:'sgbradley@gmail.com',initials:'SB'},{name:'Emily Melcher',score:1,email:'astrophysicsfun@gmail.com',initials:'EM'},{name:'Justin Dale',score:0,email:'justindale@gmail.com',initials:'JD'},{name:'Tim Meyer',score:0,email:'tim.l.meyer@gmail.com',initials:'TM'}],
};