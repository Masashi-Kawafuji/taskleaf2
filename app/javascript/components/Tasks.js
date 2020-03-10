import React from "react"
import PropTypes from "prop-types"
import Task from './Task';

function Tasks(props) {
  const taskList = props.tasks.map(task => {
    return <Task key={task.id} task={task}/>;
  });

  return (
    <table className="table table-hover">
      <tbody>{taskList}</tbody>
    </table>
  );
}

export default Tasks;
