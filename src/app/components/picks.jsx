import React from 'react';
import mui from 'material-ui';
import './../stylesheets/picks.scss';

let List = mui.List,
    ListItem = mui.ListItem,
    FlatButton = mui.FlatButton,
    ListDivider = mui.ListDivider,
    FontIcon = mui.FontIcon;

export default class Picks extends React.Component {

  constructor(props) {
    super();
  }

  _changePick(pick_data) {
    this.props.changePick(pick_data);
  }

  render() {

    return (
      <div className="Picks-container">
        <List subheader="Picks">
          {this.props.picks.map((pick, index) => {
            let pick_props = {}
            let icon_className = "material-icons pick-" + pick.amount + "-icon";
            let pick_data = {};
            pick_data.amount = (5-index);
            if (this.props.pickedTeam !== null)
              pick_data.new_team = this.props.pickedTeam;
            if (pick.team.name.length > 0)
              pick_data.old_team = pick.team;
            pick_props.key = "pick_" + (5-index);
            pick_props.ref = "pick_" + (5-index);
            // pick_props.primaryText = pick.team.name;
            pick_props.className = this.props.pickedTeam === null ? "pick-action clear" : "pick-action " + (pick.team.abbr === '' ? 'choose' : 'replace');
            return <ListItem onClick={this._changePick.bind(this, pick_data)} primaryText={<div style={{height:'16px', margin: '0 0 0 -15px'}}>{pick.team.name}</div>} {...pick_props} leftIcon={<FontIcon className={icon_className} />} />
          })}
        </List>
        <ListDivider />
        { this.props.pickedTeam === null &&
          <div className="pick-actions">
            <FlatButton secondary={true} label="Submit Picks" style={{display: 'block', margin: '16px auto'}} />
            <FlatButton secondary={true} onClick={this.props.closePicksPanel} label="Dismiss" style={{display: 'block', margin: '16px auto'}} />
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
            <FlatButton secondary={true} onClick={this.props.closePicksPanel} label="Cancel" style={{display: 'block', margin: '20px auto'}} />
          </div>
        }
      </div>
    );
  }

};