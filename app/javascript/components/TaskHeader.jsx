import React from "react"

function Header(props) {
  let taskId = props.task.id;
  let editLink = `/tasks/${taskId}/edit`
  let deleteLink = `/tasks/${taskId}`

  const handleDone = () => {
    props.handleClick(taskId)
  }

  const handleDelete = () => {
    props.handleDelete(taskId)
  }

  return (
    <tr>
      <td style={{ display: "block" }}>
        <input
          type="checkbox"
          onChange={handleDone}
          style={{
            color: props.color,
            float: "left",
            marginTop: "0.5rem",
            marginRight: "10px"
          }}
        />
        <h4
          className={props.line}
          style={{ color: props.color, margin: 0, display: 'inline-block' }}
          onClick={props.handleChange}
        >
          {props.task.name}
        </h4>
        <div style={{ float: 'right' }}>
          <a className="btn btn-primary mr-3 button" href={editLink}>編集</a>
          <a
            className="btn btn-danger delete button"
            onClick={handleDelete}
          >
            削除
           </a>
        </div>
      </td>
    </tr>
  );
}

export default Header