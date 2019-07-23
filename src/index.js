import React from "react";
import ReactDOM from "react-dom";

import "./base.css";
import "./index.css";

function Footer() {
  return (
    <footer id="footer" style={{ display: "block" }}>
      <span id="todo-count">
        <strong>5</strong> items left
      </span>
      <ul id="filters">
        <li>
          <a className="selected" href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
    </footer>
  );
}

function ToDoListItem(props) {
  return (
    <li>
      <div className="view">
        <input
          //className="toggle"
          type="checkbox"
          checked={props.items.completed}
        />
        <label>{props.items.description}</label>
        <button className="destroy" />
      </div>
      <input className="edit" defaultValue={props.items.description} />
    </li>
  );
}

function TodoList(props) {
  const todosView = [];
  for (let i = 0; i < props.items.length; i++) {
    todosView.push(<ToDoListItem items={props.items[i]} />);
  }

  return <ul id="todo-list">{todosView}</ul>;
}

function Header() {
  return (
    <header id="header">
      <h1>todos</h1>
      <input id="new-todo" placeholder="What needs to be done?" autofocus />
    </header>
  );
}

class ToDoApp extends React.Component {
  state = {
    todos: [
      { id: 1, description: "Buy tomatos", completed: false },
      { id: 2, description: "Buy potatos", completed: false },
      { id: 3, description: "Buy deneme", completed: true }
    ],
    currentFilter: "ALL",
    tempToDo: ""
  };

  render() {
    return (
      <section id="todoapp">
        <Header />
        <section id="main" style={{ display: "block" }}>
          <input id="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList items={this.state.todos} />
        </section>
        <Footer />
      </section>
    );
  }
}

class Sayac extends React.Component {
  state = { sayac: 0 };

  artir = () => {
    //alert("Tıklandı.Sayacın değeri:" + this.state.sayac);
    this.setState({ sayac: this.state.sayac + 1 });
  };

  azalt = () => {
    this.setState({ sayac: this.state.sayac - 1 });
  };

  render() {
    return (
      <div>
        Sayacın Değeri:{this.state.sayac}
        {this.state.sayac === 5 ? <p>Lütfen 5 ten fazla girmeyiniz</p> : null}
        <button onClick={this.artir} disabled={this.state.sayac === 5}>
          Arttır
        </button>
        <button onClick={this.azalt} disabled={this.state.sayac === 0}>
          Azalt
        </button>
      </div>
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
