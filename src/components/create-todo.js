import React from 'react';


export default class CreateTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      error : null
    };
  }

  renderError() {
    if(!this.state.error) { return null;}
    return <div style={{ color: 'red' }}>{this.state.error}</div>;
  }
  render() {
    return(
      <form onSubmit={this.handleCreat.bind(this)}>
        <input type="text" placeholder="What do I need to do? " ref="createInput" />
        <button>Create</button>
        {this.renderError()}
      </form>
    );
  }
  handleCreat(e) {
    e.preventDefault();

    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }
    this.setState({ error: null });
    console.log(this.refs.createInput.value ); //입력값에 받는 값들이 나온다.
    this.props.createTask(task);
    this.refs.createInput.value = ''; //한번 등록한 후 칸을 빈 공간으로 만들어 줌
  }
  validateInput(task) {
    if (!task){
      return 'Pleaze return a task.';
    } else if (_.find(this.props.todos, todo => todo.task === task)) {
      return 'Task already exists!';
    } else {
      return null;
    }
  }
}
