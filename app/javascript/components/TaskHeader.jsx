import React from "react"
import axios from "axios";

function TaskEditor(props) {
  return (
    <div style={{ display: props.display }}>
      <input
        type="text"
        defaultValue={props.taskName}
        onChange={props.handleChange}
      />
      <button
        type="submit"
        className="btn btn-primary button"
        onClick={props.handleSubmit}
        style={{ float: 'right' }}
      >
        更新
      </button>
    </div>
  )
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.handleDone = this.handleDone.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateTask = this.updateTask.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.state = {
      taskName: this.props.task.name,
      visible: true
    }
  }

  handleDone = () => {
    this.props.handleClick(this.props.task.id)
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.task.id)
  }

  toggleEdit = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleChange = e => {
    this.setState({ taskName: e.target.value })
  }

  updateTask = () => {
    axios.patch(`http://localhost:3000/tasks/${this.props.task.id}`, { name: this.state.taskName })
      .then(response => {
        this.setState({ visible: !this.state.visible })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const taskId = this.props.task.id;
    const display = this.state.visible === true ? 'block' : 'none'
    const editorDisplay = this.state.visible === true ? 'none' : 'block'
    console.log(this.state.visible)

    return (
      <tr>
        <td>
          <TaskEditor
            taskName={this.state.taskName}
            display={editorDisplay}
            handleChange={this.handleChange}
            handleSubmit={this.updateTask}
          />
          <div style={{ display: display }}>
            <input
              type="checkbox"
              onChange={this.handleDone}
              style={{
                float: "left",
                marginTop: "0.5rem",
                marginRight: "10px"
              }}
            />
            <h4
              className={this.props.style.line}
              style={{ color: this.props.style.color, margin: 0, display: 'inline-block' }}
              onClick={this.props.handleChange}
            >
              {this.state.taskName}
            </h4>
            <div style={{ float: 'right' }}>
              <a
                className="btn btn-primary mr-3 button"
                onClick={this.toggleEdit}
              >
                編集
              </a>
              <a
                className="btn btn-danger delete button"
                onClick={this.handleDelete}
              >
                削除
             </a>
            </div>
          </div>
        </td>
      </tr >
    );
  }
}

export default Header