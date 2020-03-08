import React from "react"
import PropTypes from "prop-types"

function Done(props) {
  return (
    <input
      type="checkbox"
      onChange={props.handleClick}
      style={{
        color: props.color,
        float: "left",
        marginTop: "0.5rem",
        marginRight: "10px"
      }}
    />
  );
}

function Header(props) {
  let link = `/tasks/${props.id}/edit`
  return (
    <td style={{display: "block"}}>
      <Done color={props.color} handleClick={props.handleClick}/>
      <h4
        className={props.line}
        style={{color: props.color, margin: 0}}
        onClick={props.handleChange}
      >
        {props.name}
      </h4>
      <a className="btn btn-primary mr-3 button" href={link}>編集</a>
    </td>
  );
}

function Description(props) {
  return (
    <td colSpan="2" style={{display: props.display}}>
      {props.description}
    </td>
  );
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.isDone = this.isDone.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      visible: false,
      display: 'none',
      color: 'black',
      isDone: false,
      line: ''
    };
  }

  isDone() {
    let isDone = this.state.isDone;
    if (!isDone) {
      this.setState({color: '#bbb', isDone: true, line: 'line'});
    } else {
      this.setState({color: 'black', isDone: false, line: ''});
    }
  }

  toggleVisible() {
    if (this.state.isDone) {
      return;
    }

    this.setState({visible: !this.state.visible});

    let display = this.state.visible === true ? 'block' : 'none';
    this.setState({display: display});
  }

  render() {
    return (
      <React.Fragment>
        <Header
          id={this.props.id}
          name={this.state.name}
          handleClick={this.isDone}
          handleChange={this.toggleVisible}
          color={this.state.color}
          line={this.state.line}
        />
        <Description
          description={this.state.description}
          display={this.state.display}
        />
      </React.Fragment>
    );
  }
}

export default Task
