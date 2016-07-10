import React from 'react';

export default class TodosListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isEditing: false
    };
  }
  renderTaskSection() {
    const { task, isCompleted } = this.props;

    const taskStyle = {
        color: isCompleted ? 'green' : 'red',  //if it is trun and green. if it is false and red.
        cursor: 'pointer'
    };

    if (this.state.isEditing) {
      return(
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="editInput" />
          </form>
        </td>
      );
    }

    return(
      <td
        style={taskStyle}
        onClick={this.props.toggleTask.bind(this, task)}
      >
        {task}
      </td>
    );
  }
  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.onCancleClick.bind(this)}>Cancle</button>
        </td>
      );
    }
    return (
      <td>
        <button onClick={this.onEditClick.bind(this)}>Edit</button>
        <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
      </td>
    );
  }
  render() {
    return(
      <tr>
        {this.renderTaskSection()}
        {this.renderActionsSection()}
      </tr>
    );
  }
  onEditClick() {
        this.setState({ isEditing: true });
  }
  onCancleClick() {
        this.setState({ isEditing: false });
  }
  onSaveClick(e) {
        e.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
  }
}
