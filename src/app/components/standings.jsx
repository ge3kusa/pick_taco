import React from 'react';
import mui from 'material-ui';
import Gravatar from './gravatar';
import './../stylesheets/standings.scss';

let List = mui.List,
    Avatar = mui.Avatar;

export default class Standings extends React.Component {

  constructor(props) {
    super();
  }

  render() {

    return (
      <div className="Standings-container">
        <List className="standings-column">
          {this.props.standings.map((user, index) => {
            return (
              <div className="standing" key={"standing_" + index}>
                <div className="gravatar-parent">
                  <Gravatar s={50} email={user.email} d="blank" fallBack={<Avatar size={50} className="avatar">{user.initials}</Avatar>} />
                </div>
                <div className="primary">{user.name}</div>
                <div className="secondary">{user.score + " points"}</div>
                <div className="rank">{index + this.props.indexPad}</div>
              </div>
            );
          })}
        </List>
      </div>
    );
  }

};
