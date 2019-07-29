import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

function SayacReducer(stateBaslangic = { counter: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { counter: stateBaslangic.counter + 1 };
    case "DECREMENT":
      return { counter: stateBaslangic.counter - 1 };
    case "RESET":
      return { counter: 0 };
    default:
      return stateBaslangic;
  }
}

const store = createStore(SayacReducer);

class Sayac extends React.Component {
  constructor() {
    super();
    this.state = store.getState(); /////state demek zorundayız.

    store.subscribe(() => {
      this.setState(store.getState()); ////state değiştiğinde son halini stateimize setliyoruz
    });
  }
  render() {
    return (
      <div>
        Sayac Değeri : {this.state.counter}
        <br />
        <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
          ARTIR
        </button>
        <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
          AZALT
        </button>
        <button onClick={() => store.dispatch({ type: "RESET" })}>
          RESETLE
        </button>
      </div>
    );
  }
}

function Sayac2({ counter, increment, decrement, reset }) {
  return (
    <div>
      Sayac Değeri : {counter}
      <button onClick={increment}>ARTIR</button>
      <button onClick={decrement}>AZALT</button>
      <button onClick={reset}>RESETLE</button>
    </div>
  );
}

const ConnectedSayac = connect(
  state => ({ counter: state.counter }),
  dispatch => ({
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    reset: () => dispatch({ type: "RESET" })
  })
)(Sayac2);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedSayac />
      </Provider>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
