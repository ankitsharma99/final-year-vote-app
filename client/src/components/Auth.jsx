import React, { Component } from "react";
import { connect } from "react-redux";

import { authUser, logout } from "../store/actions";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { username, password } = this.state;
    const { authType } = this.props;

    e.preventDefault();

    this.props.authUser(authType || "login", { username, password });
  }

  render() {
    let logOrRegister;
    let { authType } = this.props;
    if (authType === "register") {
      logOrRegister = "register";
    } else {
      logOrRegister = "login";
    }
    const { username, password } = this.state;

    return (
      <div className='main-div'>
        <div className='loginOrRegister'>
          {logOrRegister === "register"
            ? "Register a new user"
            : "Login for an existing user"}
        </div>
        <form className='form' onSubmit={this.handleSubmit}>
          <label htmlFor='username' className='form-label'>
            username
          </label>
          <input
            className='form-input'
            type='text'
            value={username}
            name='username'
            autoComplete='off'
            onChange={this.handleChange}
          />

          <label htmlFor='password' className='form-label'>
            password
          </label>
          <input
            className='form-input'
            type='password'
            value={password}
            name='password'
            autoComplete='off'
            onChange={this.handleChange}
          />
          <div className='button_center'>
            <button className='button' type='submit'>
              {logOrRegister === "register" ? "Register" : "Login"}
            </button>
          </div>
          {logOrRegister === 'login' ? 
            <div className='notAMember'>
              Not a member?{" "}
              <a href='/register'>
                <span className='register'>Register Here</span>
              </a>{" "}
              Now
            </div> : 
            <div className='alreadyMember'>
            Already a member?{" "}
            <a href='/login'>
              <span className='login'>Login Here</span>
            </a>{" "}
            Now
          </div>
          }
        </form>
      </div>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);
