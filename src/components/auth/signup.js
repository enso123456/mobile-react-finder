import React, {Component} from "react"
import {connect} from "react-redux"
import SignupForm from "./signup_form"
import * as actions from "../../actions"

class Signup extends Component {
  handleFormSubmit = values => {
    this.props.signupUser(values)
  }

  render() {
    return <SignupForm onSubmit={this.handleFormSubmit} {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(Signup)
