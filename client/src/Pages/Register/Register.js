import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
//import "./Signup.css";
// import propTypes from "prop-types";
import { Redirect } from "react-router-dom";
import RouteNames from "../../constants/routes";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import styled from "styled-components";

const RegisterForm = styled.div`
  position: absolute;
  top: 42%;
  left: 50%;
  margin: -170px 0 0 -150px;
  width: 330px;
  height: auto;
  padding: 20px;
  border-radius: 1%;
  background-color: bisque;
`;

const label = styled.label`
  color: black;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: rgb(180, 55, 55);
  color: black;
  width: 120px;
  height:38px;
  border-radius: 6px;
  font-weight:bolder;
  outline: invert;
  margin-left: 75px;
  margin-right: auto;
  &:hover{
    border: 2px solid #e93333;
    background: 0 0;
    color: black;
  }
`;

const input = styled.input``;

class Signup extends React.Component {
  state = {
    submitted: false,
    ok: true,
  };

  componentDidMount() {
    this.props.refresh();
  }

  Changehandler = (name) => (event) => {
    this.props.change(name, event.target.value);
  };

  clickSubmit = async () => {
    this.setState({ submitted: true });
    return this.props.submit();
  };

  render() {
    return (
      <RegisterForm>
        {this.props.open ? <Redirect to={RouteNames.home} /> : null}
        <Form>
          {this.props.show ? (
            <div className="alert">
              <span
                className="closebtn"
                onClick="this.parentElement.style.display='none';"
              >
                &times;
              </span>
              {this.props.error}
            </div>
          ) : null}
          <div
            className={
              "form-group" +
              (this.state.submitted && !this.props.first_name
                ? " has-error"
                : "")
            }
          >
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={this.props.first_name}
              onChange={this.Changehandler("first_name")}
              placeholder="First name"
            />
            {this.state.submitted && !this.props.first_name && (
              <div className="help-block">First Name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (this.state.submitted && !this.props.last_name
                ? " has-error"
                : "")
            }
          >
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={this.props.last_name}
              onChange={this.Changehandler("last_name")}
              placeholder="Last name"
            />
            {this.state.submitted && !this.props.last_name && (
              <div className="help-block">Last Name is required</div>
            )}
          </div>

          <div
            className={
              "form-group" +
              (this.state.submitted && !this.props.username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.props.username}
              onChange={this.Changehandler("username")}
              placeholder="Username"
            />
            {this.state.submitted && !this.props.last_name && (
              <div className="help-block">Username is required</div>
            )}
          </div>

          <div
            className={
              "form-group" +
              (this.state.submitted && !this.props.email ? " has-error" : "")
            }
          >
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={this.props.email}
              onChange={this.Changehandler("email")}
              placeholder="Email"
            />
            {this.state.submitted && !this.props.email && (
              <div className="help-block">Email is required</div>
            )}
          </div>

          <div
            className={
              "form-group" +
              (this.state.submitted && !this.props.last_name
                ? " has-error"
                : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.props.password}
              onChange={this.Changehandler("password")}
              placeholder="Password"
            />
            {this.state.submitted && !this.props.password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <Button
              size="md"
              onClick={this.clickSubmit}
            >
              Submit
            </Button>

        </Form>
      </RegisterForm>
    );
  }
}

const mapStateToProps = (state) => {
  const RegisterState = {
    email: state.email,
    first_name: state.first_name,
    username: state.username,
    last_name: state.last_name,
    password: state.password,
    open: state.open,
    error: state.error,
    show: state.show,
    submitted: state.submitted,
  };
  return RegisterState;
};

const mapDispatchToProps = (dispatch) => {
  return {
    change: (name, value) =>
      dispatch({ type: actionTypes.MODIFY, name, value }),
    submit: () => dispatch({ type: actionTypes.REGISTER }),
    refresh: () => dispatch({ type: actionTypes.REFRESH }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
