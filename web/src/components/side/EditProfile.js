import React from "react";
import { Row, Form, Input, Button } from "reactstrap";
import Error from "components/Error";
import Avatar from "components/Avatar";
import axios from "axios";

class EditProfile extends React.Component {
  state = { name: this.props.user.name, about: this.props.user.about };

  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }

  showFileUpload = (e) => this.fileUpload.current.click();

  onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(e.target.files[0]),
        avatar: e.target.files[0],
      });
    }
  };

  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: null });

  onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("about", this.state.about);
    if (this.state.avatar)
      data.append("avatar", this.state.avatar, this.state.avatar.name);
    axios
      .post("/api/account", data)
      .then(this.props.toggle)
      .catch((err) =>
        this.setState({
          error: err.response.data.message,
        })
      );
  };

  onClose = (e) => {
    this.setState({
      image: false,
      name: this.props.user.name,
      about: this.props.user.about,
    });
    this.props.toggle();
  };

  render() {
    return (
      <div className={this.props.open ? "side-profile open " : "side-profile"}>
        <Row className="heading">
          <div className="mr-2 nav-link" onClick={this.onClose}>
            <i className="fa fa-arrow-right" />
          </div>
          <div>الملف الشخصي</div>
        </Row>

        <div
          className="d-flex flex-column auth _card_"
          style={{ overflow: "auto" }}
        >
          <form onSubmit={this.onSubmit}>
            <Error error={this.state.error} />

            <div className="text-center" onClick={this.showFileUpload}>
              <Avatar src={this.props.user.avatar} file={this.state.image} />
            </div>

            <input
              type="file"
              ref={this.fileUpload}
              onChange={this.onImageChange}
              className="d-none"
            />

            <label className="label-muted">الاسم</label>
            <input
              className="input__profile"
              value={this.state.name}
              name="name"
              onChange={this.onChange}
              required
            />

            <label className="label-muted">رسالة الحالة</label>
            <input
              className="input__profile"
              value={this.state.about}
              name="about"
              onChange={this.onChange}
              required
            />

            <div className="px-3 py-2">
              <button className="_btn_ btn__primary mt-3">حفظ</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
