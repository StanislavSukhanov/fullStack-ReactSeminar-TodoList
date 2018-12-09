import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


// stateless conponend is declared as function element 
const Title = (props) => {
  return (
    <div>
      <h1>ToDo list ({props.count})</h1>
    </div>
  )
}

const TodoForm = ({addTodo}) => {
  let input;

  return(
    <div>
      <input ref={ node => {
          input = node;
        }} />

      <button onClick={ () => {
        addTodo(input.value);
        input.value = '';
        }}> + Add</button>
    </div>
  );
};


const Todo = ({ todo, remove, complete }) => {
  // each todo 
  return(
    <li>
      <span className={todo.completed ? 'completed' : null  }>{todo.title}</span>
      <b style={{cursor: 'pointer'}} onClick={() => { remove(todo)} }>+</b>
      <b style={{cursor: 'pointer'}} onClick={() => { complete(todo)} }>V</b>
    </li>
  );
}


const TodoList = ({todolist, remove, complete}) => {
  // map throurgh todolist
  const todoItem = todolist.map((todo) => {
    return (<Todo todo={todo} remove={remove} complete={complete}/>);
  });
  return( <ul>{todoItem}</ul> );
}


class TodoApp extends Component {
  constructor(props){
    super(props);
    this.removeTodo = this.removeTodo.bind(this);
    this.indexOfElement = this.indexOfElement.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.state = {
      data: [ 
        {title: "buy milk",completed: false},
        {title: "send letter",completed: true},
        {title: "meet with friend",completed: false}
      ] 
    }
    console.log(this.state.data);
  }
  


  indexOfElement(todo) {
    // to get index of element
    let data = this.state.data;
    let indexOf = -1; 
    data.forEach((item, index) =>{
      if (item.title === todo.title){
        console.log(item.title);
        indexOf = index;
      }
    })
    return indexOf;
  }

  removeTodo(todo){
    console.log(this.state.data);
    let data = this.state.data;
    let indexOfRemovedElem = this.indexOfElement(todo);
    console.log(data.indexOf(todo));
    data.splice(indexOfRemovedElem, 1);
    this.setState({data: data});
  }


  completeTodo(todo){
    let data = this.state.data;
    let indexOfRemovedElem = this.indexOfElement(todo);
    data.splice(indexOfRemovedElem, 1, {title: todo.title, completed: !todo.completed});
    this.setState({data: data});
    console.log(this.state.data);
  }

  addTodo(value){
    let data = this.state.data;
    data.push({title: value, completed: false})
    console.log(data);
    this.setState({data: data});
    
  }


  render(){
    return(
      <div>
        <Title count={this.state.data.length} />
        <TodoForm addTodo={this.addTodo}/>
        <TodoList todolist={this.state.data} remove={this.removeTodo} complete={this.completeTodo}/>
      </div>
    );
  }
}

export default TodoApp;

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }


