import React from 'react';
import mui from 'material-ui';
import './../stylesheets/standings.scss';

let List = mui.List,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider,
    Avatar = mui.Avatar;

export default class Standings extends React.Component {

  constructor(props) {
    super();
  }

  render() {

    return (
      <div className="Standings-container">
        <List subheader="Standings">
          {this.props.standings.map((user, index) => {
            return <ListItem className="standing" key={"standing_" + index} primaryText={user.name} secondaryText={user.score + " points"} leftAvatar={<Avatar>{user.initials}</Avatar>} />
          })}
        </List>
      </div>
    );
  }

};
