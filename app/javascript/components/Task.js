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
  let taskId = props.id;
  let editLink = `/tasks/${taskId}/edit`
  let deleteLink = `/tasks/${taskId}`

  return (
    <tr>
      <td style={{display: "block"}}>
        <Done color={props.color} handleClick={props.handleClick}/>
        <h4
          className={props.line}
          style={{color: props.color, margin: 0, display: 'inline-block'}}
          onClick={props.handleChange}
        >
          {props.name}
        </h4>
        <div style={{float: 'right'}}>
          <a className="btn btn-primary mr-3 button" href={editLink}>編集</a>
          <a dataconfirm="タスク「sample1」を削除します。よろしいですか？"
             className="btn btn-danger delete button "
             dataremote="true"
             rel="nofollow"
             datamethod="delete"
             href={deleteLink}>
             削除
           </a>
        </div>
      </td>
    </tr>
  );
}

function Description(props) {
  return (
    <tr>
      <td style={{display: props.display}}>
        {props.description}
      </td>
    </tr>
  );
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.handleDone = this.handleDone.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.state = {
      visible: false,
      display: 'none',
      isDone: false,
    };
  }

  handleDone() {
    this.setState({isDone: !this.state.isDone});
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
    const color = this.state.isDone == true ? '#bbb' : 'black';
    const line = this.state.isDone == true ? 'line' : '';

    const task = this.props.task;

    return (
      <React.Fragment>
        <Header
          id={task.id}
          name={task.name}
          handleClick={this.handleDone}
          handleChange={this.toggleVisible}
          color={color}
          line={line}
        />
        <Description
          description={task.description}
          display={this.state.display}
        />
      </React.Fragment>
    );
  }
}

export default Task;
