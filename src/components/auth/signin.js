import React, {Component} from "react"
import {connect} from "react-redux"
import SigninForm from "./signin_form"
import * as actions from "../../actions"

class Signin extends Component {
  handleFormSubmit = values => {
    this.props.signinUser(values)
  }

  render() {
    return <SigninForm onSubmit={this.handleFormSubmit} {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(Signin)
