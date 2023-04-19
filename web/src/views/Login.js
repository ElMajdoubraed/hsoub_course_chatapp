import React from "react";
import { Link } from "react-router-dom";
import { Card, Form, Input, Button } from "reactstrap";
import Error from "components/Error";
import Logo from "assets/logo.png";
import Auth from "Auth";
import axios from "axios";

class Login extends React.Component {
  state = { username: "", password: "", error: "" };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });

  onSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("/api/auth", data)
      .then((res) => {
        Auth.login(res.data);
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
          <img src={Logo} alt="" width="200" />
          <h5 className="text__title mb-4">تسجيل الدخول</h5>
          <Error error={this.state.error} />
          <input
            value={this.state.username}
            name="username"
            onChange={this.onChange}
            placeholder="اسم المستخدم"
            required
          />
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.onChange}
            placeholder="كلمة المرور"
            required
          />
          <button className="_btn_ btn__primary mb-3"> تسجيل الدخول </button>
          <small>
            <Link to="/register">إنشاء حساب جديد</Link>
          </small>
          <p className="m-3 text-muted">&copy; {new Date().getFullYear()}</p>
        </form>
      </div>
    );
  }
}

export default Login;
