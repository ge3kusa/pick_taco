import React from 'react';
import mui from 'material-ui';
import './../stylesheets/picks.scss';

let List = mui.List,
    ListItem = mui.ListItem,
    RaisedButton = mui.RaisedButton,
    FlatButton = mui.FlatButton,
    ListDivider = mui.ListDivider,
    FontIcon = mui.FontIcon;

export default class Picks extends React.Component {

  constructor(props) {
    super();
  }

  render() {

    return (
      <div className="Picks-container">
        <List subheader="Picks">
          {this.props.picks.map((pick, index) => {
            let pick_props = {}
            let icon_className = "material-icons pick-" + pick.amount + "-icon";
            pick_props.key = "pick_" + (5-index);
            pick_props.ref = "pick_" + (5-index);
            // pick_props.primaryText = pick.team.name;
            pick_props.className = this.props.pickedTeam === null ? "pick-action clear" : "pick-action " + (pick.team.abbr === '' ? 'choose' : 'replace');
            return <ListItem primaryText={<div style={{height:'16px', margin: '0 0 0 -15px'}}>{pick.team.name}</div>} {...pick_props} leftIcon={<FontIcon className={icon_className} />} />
          })}
        </List>
        <ListDivider />
        { this.props.pickedTeam === null &&
          <div className="pick-actions">
            <RaisedButton label="Submit Picks" style={{width: '210px', display: 'block', margin: '18px auto'}}>
              <FontIcon style={{float: 'left', verticalAlign: 'middle', lineHeight: '36px', display: 'inline-block', paddingLeft: '12px'}} className="material-icons submit-picks-icon" />
            </RaisedButton>
            <RaisedButton onClick={this.props.clearAllPicks} label="Clear All" style={{width: '210px', display: 'block', margin: '18px auto'}}>
              <FontIcon style={{float: 'left', verticalAlign: 'middle', lineHeight: '36px', display: 'inline-block', paddingLeft: '12px'}} className="material-icons cancel-picks-icon" />
            </RaisedButton>
            <RaisedButton onClick={this.props.closePicksPanel} label="Back to Matchups" style={{width: '210px', display: 'block', margin: '18px auto'}}>
              <FontIcon style={{float: 'left', verticalAlign: 'middle', lineHeight: '36px', display: 'inline-block', paddingLeft: '12px'}} className="material-icons dismiss-panel-icon" />
            </RaisedButton>
          </div>
        }
        { this.props.pickedTeam !== null &&
          <div className="pick-details">
            <List subheader="Current Pick">
              <div className="pick-team">
                <img src={"images/" + this.props.pickedTeam.abbr + ".png"} />
                <div className="team">{this.props.pickedTeam.name}</div>
              </div>
            </List>
            <RaisedButton onClick={this.props.closePicksPanel} label="Cancel" style={{width: '130px', display: 'block', margin: '20px auto'}}>
              <FontIcon style={{float: 'left', verticalAlign: 'middle', lineHeight: '36px', display: 'inline-block', paddingLeft: '12px'}} className="material-icons cancel-picks-icon" />
            </RaisedButton>
          </div>
        }
      </div>
    );
  }

};