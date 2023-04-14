import React from "react";
import { Link } from "react-router-dom";
import { Card, Form, Input, Button } from "reactstrap";
import { Error } from "components";
import axios from "axios";
import logo from "assets/logo.png";

class Password extends React.Component {
  state = { password: "", newPassword: "" };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });

  onSubmit = (e) => {
    e.preventDefault();
    let data = {
      password: this.state.password,
      newPassword: this.state.newPassword,
    };
    axios
      .post("/api/account/password", data)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ error: err.response.data.message });
      });
  };

  render() {
    return (
      <div className="auth _card_ col-lg-4 col-6">
        <form onSubmit={this.onSubmit}>
          <img src={logo} alt="" width="200" />
          <h5 className="text__title mb-4">تغيير كلمة المرور</h5>
          <Error error={this.state.error} />
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.onChange}
            placeholder="كلمة المرور الحالية"
            required
          />
          <input
            type="password"
            value={this.state.newPassword}
            name="newPassword"
            onChange={this.onChange}
            placeholder="كلمة المرور الجديدة"
            required
          />
          <button className="_btn_ btn__primary mb-3"> تغيير </button>
          <small>
            <Link to="/">عودة</Link>
          </small>
          <p className="m-3 mb-3 text-muted">
            &copy; {new Date().getFullYear()}
          </p>
        </form>
      </div>
    );
  }
}

export default Password;
