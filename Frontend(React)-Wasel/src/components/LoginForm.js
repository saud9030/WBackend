import React, { Component } from "react";
import { setJwt } from "../services/AuthService";
class LoginForm extends Component {
  state = {
    formData: {
      username: null,
      password: null
    },
    err: null
  };

  handleLoginRequest = user => {
    let apiUrl = "http://localhost:3001/api/login";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) this.setState({ err: data.error });
        else {
          setJwt(data.token);
          this.props.onLogin();
        }
      })
      .catch(e => console.log(e));
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("I'm trying to submit ");
    this.handleLoginRequest(this.state.formData);
  };

  handleChange = ({ currentTarget }) => {
    console.log(currentTarget.name, "= ", currentTarget.value);
    const formData = { ...this.state.formData };
    formData[currentTarget.name] = currentTarget.value;
    this.setState({ formData });
  };

  render() {
    return (
      <div className="pt-5 mt-5">
        <h1>PLEASE LOGIN</h1>
        {this.state.err ? (
          <div className="alert alert-warning"> {this.state.err} </div>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username </label>
            <input
              name="username"
              className="form-control"
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              name="password"
              className="form-control"
              type="password"
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
