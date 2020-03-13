import React from "react"
import PropTypes from "prop-types"
import Header from './TaskHeader'
import axios from "axios";

function Description(props) {
  return (
    <tr>
      <td style={{ display: props.display }}>
        {props.description}
      </td>
    </tr>
  );
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.doneTask = this.doneTask.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.state = {
      visible: false,
      display: 'none',
      isDone: this.props.task.done
    };
  }

  // handleDone() {
  //   this.setState({ isDone: !this.state.isDone });
  // }

  doneTask = id => {
    axios.post(`http://localhost:3000/tasks/${id}/done`)
      .then(response => {
        this.setState({ isDone: !this.state.isDone })
      })
      .catch(data => {
        console.log(data)
      })
  }

  toggleVisible() {
    if (this.state.isDone) {
      return;
    }

    this.setState({ visible: !this.state.visible });

    let display = this.state.visible === true ? 'block' : 'none';
    this.setState({ display: display });
  }

  render() {
    const color = this.state.isDone == true ? '#bbb' : 'black';
    const line = this.state.isDone == true ? 'line' : '';

    const task = this.props.task;

    return (
      <React.Fragment>
        <Header
          task={this.props.task}
          handleClick={this.doneTask}
          handleChange={this.toggleVisible}
          handleDelete={this.props.handleDelete}
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
