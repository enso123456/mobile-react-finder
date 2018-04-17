import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router";
import InputField from "./input_field";
import styles from "./styles/form";

class SigninForm extends Component {
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
    // helper from reduxForm
    const { handleSubmit, onSubmit } = this.props;

    return (
      <div style={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.formBody}>
          <fieldset>
            <label style={styles.label}>Username or email address</label>
            <div style={styles.inputBlock}>
              <Field
                name="email"
                component={props => <InputField {...props} />}
                type="text"
                placeholder="Email"
              />
            </div>
          </fieldset>
          <fieldset>
            <label style={styles.label}>Password: </label>
            <div style={styles.inputBlock}>
              <Field
                name="password"
                component={props => <InputField {...props} />}
                type="password"
                placeholder="Password"
              />
            </div>
          </fieldset>
          {this.renderAlert()}
          <button style={styles.button} className="btn" type="submit">
            Sign in
          </button>
        </form>

        <p style={styles.callout}>
          <Link to="/signup">Create an account.</Link>
        </p>
      </div>
    );
  }
}

// first config the component
export default reduxForm({
  form: "signin"
})(SigninForm);
