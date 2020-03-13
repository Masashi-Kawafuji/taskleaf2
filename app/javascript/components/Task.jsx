import React from "react"
import Header from './TaskHeader'
import axios from "axios";

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
    const task = this.props.task;
    const nameStyle = () => {
      if (this.state.isDone === true) {
        return { color: '#ddd', line: 'line' }
      } else {
        return { color: 'black', line: '' }
      }
    }

    return (
      <React.Fragment>
        <Header
          task={this.props.task}
          handleClick={this.doneTask}
          handleChange={this.toggleVisible}
          handleDelete={this.props.handleDelete}
          style={nameStyle()}
        />
        <tr>
          <td style={{ display: this.state.display }}>
            {this.props.task.description}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Task;
