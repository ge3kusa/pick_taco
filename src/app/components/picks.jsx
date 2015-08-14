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

  _icon_map(index) {
    let icon_map = {
      5: "five", 4: "four", 3: "three", 2: "two", 1: "one",
    };
    return icon_map[index];
  }

  render() {

    return (
      <div className="Picks-container">
        <List subheader="Picks">
          {this.props.picks.map((pick, index) => {
            let pick_props = {}
            let icon_className = "material-icons " + this._icon_map(pick.amount) + "-icon";
            pick_props.primaryText = pick.team;
            pick_props.key = "pick_" + index + 1;
            pick_props.ref = "pick_" + index + 1;
            return <ListItem {...pick_props} leftIcon={<FontIcon className={icon_className} />} rightIconButton={<FlatButton style={{marginTop: '6px', fontSize: '70%'}} label="Clear" primary={true} />} />
          })}
        </List>
        <ListDivider />
        <RaisedButton label="Submit Picks" style={{width: '180px', display: 'block', margin: '20px auto'}}>
          <FontIcon style={{float: 'left', verticalAlign: 'middle', lineHeight: '36px', display: 'inline-block', paddingLeft: '12px'}} className="material-icons submit-picks-icon" />
        </RaisedButton>
        <RaisedButton label="Reset Picks" style={{width: '180px', display: 'block', margin: '20px auto'}}>
          <FontIcon style={{float: 'left', verticalAlign: 'middle', lineHeight: '36px', display: 'inline-block', paddingLeft: '12px'}} className="material-icons cancel-picks-icon" />
        </RaisedButton>
      </div>
    );
  }

};
