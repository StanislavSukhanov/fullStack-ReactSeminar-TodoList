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


const Todo = ({ todo, remove }) => {
  // each todo 
  return(
    <li>
      {todo.title}
      <b style={{cursor: 'pointer'}} onClick={() => remove(todo)}>+</b>
    </li>
  );
}


const TodoList = ({todolist, remove}) => {
  // map throurgh todolist
  const todoItem = todolist.map((todo) => {
    return (<Todo todo={todo} remove={remove} />);
  });
  return( <ul>{todoItem}</ul> );
}


class TodoApp extends Component {
  constructor(props){
    super(props);
    this.removeTodo = this.removeTodo.bind(this);
    this.indexOfElement = this.indexOfElement.bind(this);
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


  render(){
    return(
      <div>
        <Title count={this.state.data.length} />
        <TodoList todolist={this.state.data} remove={this.removeTodo} />
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


