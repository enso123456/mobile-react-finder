import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import InputField from "./input_field";
import styles from "./styles/form";

class SignoutForm extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops! </strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <div className={"col-md-6"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label style={styles.label}>Username: </label>
            <div style={styles.inputBlock}>
              <Field
                name="username"
                component={InputField}
                type="text"
                placeholder="Username"
              />
              <p style={styles.note}>This will be your username.</p>
            </div>
          </fieldset>
          <fieldset>
            <label style={styles.label}>Email: </label>
            <div style={styles.inputBlock}>
              <Field
                name="email"
                component={InputField}
                type="text"
                placeholder="Email"
              />
            </div>
            <p style={styles.note}>
              We'll never share your email address with anyone.
            </p>
          </fieldset>
          <fieldset>
            <label style={styles.label}>Password: </label>
            <div style={styles.inputBlock}>
              <Field
                name="password"
                component={InputField}
                type="password"
                placeholder="Password"
              />
            </div>
            <p style={styles.note}>This will be your password.</p>
          </fieldset>
          <fieldset>
            <label style={styles.label}>Confirm Password: </label>
            <div style={styles.inputBlock}>
              <Field
                name="passwordConfirm"
                component={InputField}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <p style={styles.note}>Please confirm your password.</p>
          </fieldset>
          {this.renderAlert()}
          <button className="btn" type="submit" style={styles.button}>
            Create an account
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email";
  }

  if (!values.password) {
    errors.password = "Please enter an password";
  }

  if (!values.password) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = "Password must match";
  }

  return errors;
}
// first config the component
export default reduxForm({
  form: "signout",
  validate
})(SignoutForm);
