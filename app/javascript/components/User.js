import React from "react"
import PropTypes from "prop-types"

function ProfileHeader(props) {
  return (
    <div>
      <a className="btn btn-primary">編集</a>
    </div>
  );
}

function ProfileMain(props) {
  const params = [];
  function propsToArray(obj) {
    for(let [key, value] of Object.entries(obj)) {
      params.push(value);
    }
  }
  propsToArray(props)

  function editContent() {
    visible == true ? false : true
  }

  function Content(props) {
    return (
      <p>{props.str}</p>
    );
  }

  const Contents = params.map((param, index) => {
    return (
      <li key={index}>
        <Content str={param}/>
      </li>
    );
  });

  return (
    <div>
      <ul>
        {Contents}
      </ul>
    </div>
  );
}

class User extends React.Component {
  render () {
    return (
      <React.Fragment>
        <ProfileHeader/>
        <ProfileMain name={this.props.name} email={this.props.email}/>
      </React.Fragment>
    );
  }
}

export default User
