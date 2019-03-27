import React, { Component } from "react";
import "./App.css";
import { getUser } from "./services/AuthService";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    // check if we have a token in the local storage
    const user = getUser();
    console.log(user);
    if (user) {
      this.setState({ user });
    }
  }

  onLogin = () => {
    this.setState({ user: getUser() });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="container">
          {this.state.user ? (
            <h1>profile</h1>
          ) : (
            <LoginForm onLogin={this.onLogin} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
