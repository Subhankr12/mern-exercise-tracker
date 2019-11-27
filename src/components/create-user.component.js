import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor() {
    super();

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { username: "" };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    };

    console.log(user);
    axios
      .get(`http://localhost:5000/users/add?username=${user.username}`)
      .then(res => console.log(res.data));

    // window.location = "/";
    this.setState({
      username: ""
    });
  }

  componentDidMount() {
    console.log("create user mounted");
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username : </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
