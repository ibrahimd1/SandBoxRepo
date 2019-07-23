import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

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
      <h2>Start editing to see some magic happen!</h2>*/}
      <Sayac />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
