import React from "react";
import ReactDOM from "react-dom";
import "./base.css";
import "./index.css";
import Footer from "./footer";
import { createStore } from "redux";

function ToDoListItem({ item, toggleToDo, destroyToDo }) {
  return (
    <li>
      <div className="view">
        <input
          //className="toggle"
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleToDo(item.id)}
        />
        <label>{item.description}</label>
        <button className="destroy" onClick={() => destroyToDo(item.id)} />
      </div>
      <input className="edit" defaultValue={item.description} />
    </li>
  );
}
function TodoList({ items, toggleToDo, destroyToDo }) {
  return (
    <ul id="todo-list">
      {items.map(item => (
        <ToDoListItem
          key={item.id}
          item={item}
          toggleToDo={toggleToDo}
          destroyToDo={destroyToDo}
        />
      ))}
    </ul>
  );
}
function Header({ value, onChange, onSubmit }) {
  return (
    <header id="header">
      <h1>todos</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          id="new-todo"
          placeholder="What needs to be done?"
          autofocus
          value={value}
          onChange={evt => onChange(evt.target.value)}
        />
      </form>
    </header>
  );
}

const defaultState = {
  todos: [
    { id: 1, description: "Buy tomatos", completed: false },
    { id: 2, description: "Buy potatos", completed: true },
    { id: 3, description: "Buy deneme", completed: true }
  ],
  toDoCounter: 3,
  currentFilter: "ALL",
  tempToDo: ""
};

const store = createStore(ToDoAppReducer);
store.dispatch({ type: "TOGGLE_TODO", payload: 1 });

function ToDoAppReducer(oldState = defaultState, action) {
  if (action.type === "TOGGLE_TODO") {
    const todos = oldState.todos;

    const todosV2 = todos.map(todo => {
      if (todo.id === action.payload) {
        return { ...todo, completed: !todo.completed };
      } else return todo;
    });
    const newState = { ...oldState, todos: todosV2 };
    return newState;
  } else if (action.type === "DESTROY_TODO") {
    return {
      ...oldState,
      todos: oldState.todos.filter(todo => todo.id !== action.payload)
    };
  } else if (action.type === "SETTEMP_TODO") {
    return { ...oldState, tempToDo: action.payload };
  } else if (action.type === "INSERT_TODO") {
    const { toDoCounter, tempToDo, todos } = oldState;

    if (todos.some(x => x.description === tempToDo) || tempToDo.length === 0) {
      return oldState;
    }

    const newToDo = {
      id: toDoCounter + 1,
      description: tempToDo,
      completed: false
    };
    const todos2 = [newToDo, ...todos];
    return {
      ...oldState,
      todos: todos2,
      toDoCounter: toDoCounter + 1,
      tempToDo: ""
    };
  }
}

class ToDoApp extends React.Component {
  state = {
    todos: [
      { id: 1, description: "Buy tomatos", completed: false },
      { id: 2, description: "Buy potatos", completed: true },
      { id: 3, description: "Buy deneme", completed: true }
    ],
    toDoCounter: 3,
    currentFilter: "ALL",
    tempToDo: ""
  };
  toggleToDo(id) {
    const todos = this.state.todos;
    const todosV2 = todos.map(todo => {
      if (todo.id === id) return { ...todo, completed: !todo.completed };
      else return todo;
    });
    this.setState({ todos: todosV2 });
  }
  destroyToDo(id) {
    const todos = this.state.todos;
    const todosV2 = todos.filter(todo => todo.id !== id);
    this.setState({ todos: todosV2 });
  }
  get nItemsLeft() {
    return this.state.todos.filter(item => !item.completed).length;
  }
  setTempToDo(tempToDo) {
    this.setState({ tempToDo });
  }
  insertToDo() {
    const { toDoCounter, tempToDo, todos } = this.state;

    if (todos.some(x => x.description === tempToDo) || tempToDo.length === 0) {
      return;
    }

    const newToDo = {
      id: toDoCounter + 1,
      description: tempToDo,
      completed: false
    };
    const todos2 = [newToDo, ...todos];
    this.setState({
      todos: todos2,
      toDoCounter: toDoCounter + 1,
      tempToDo: ""
    });
  }
  setCurrentFilter(currentFilter) {
    this.setState({ currentFilter });
  }
  getVisibleToDos() {
    let visibleToDos = [];
    if (this.state.currentFilter === "ALL") {
      visibleToDos = this.state.todos;
    } else if (this.state.currentFilter === "ACTIVE") {
      visibleToDos = this.state.todos.filter(todo => !todo.completed);
    } else {
      visibleToDos = this.state.todos.filter(todo => todo.completed);
    }
    return visibleToDos;
  }
  getDebug(obj) {
    return <pre>{JSON.stringify(obj, null, 4)}</pre>;
  }
  render() {
    return (
      <section id="todoapp">
        {false && this.getDebug(this.state)}
        <Header
          value={this.state.tempToDo}
          onChange={this.setTempToDo.bind(this)}
          onSubmit={this.insertToDo.bind(this)}
        />
        <section id="main" style={{ display: "block" }}>
          <input id="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            items={this.getVisibleToDos()}
            toggleToDo={this.toggleToDo.bind(this)}
            destroyToDo={this.destroyToDo.bind(this)}
          />
        </section>
        <Footer
          nItemsLeft={this.nItemsLeft}
          currentFilter={this.state.currentFilter}
          setCurrentFilter={this.setCurrentFilter.bind(this)}
        />
      </section>
    );
  }
}
function App() {
  return (
    <div className="App">
      {/*<h1>Hello merhaba nasılsın CodeSandbox</h1>
<h2>Start editing to see some magic happen!</h2> <Sayac />
*/}
      <ToDoApp />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
