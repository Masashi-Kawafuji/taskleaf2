import React from "react"
import PropTypes from "prop-types"
import Task from './Task'
import axios from 'axios'

class Tasks extends React.Component {
  constructor(props) {
    super(props)
    this.deleteTask = this.deleteTask.bind(this)
    this.state = { tasks: this.props.tasks }
  }

  // assignTasks() {
  //   axios.get('http://localhost:3000/tasks')
  //     .then(response => {
  //       console.log(response)
  //       this.setState = { taks: 'jjj' }
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  deleteTask = id => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(response => {
        const TaskIndex = this.state.tasks.findIndex(task => task.id === id)
        this.state.tasks.splice(TaskIndex, 1)
        this.setState({ tasks: this.state.tasks })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    console.log(this.state.tasks)
    return (
      <table className="table table-hover">
        <tbody>
          {this.state.tasks.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                handleDelete={this.deleteTask}
              />
            )
          })}
        </tbody>
      </table>
    );
  }
}

export default Tasks;
