import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import styles from "./styles";

class Search extends Component {
  state = {
    input: "",
    data: {},
    isSearching: false,
    showAlert: false
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      data: nextProps.result,
      isSearching: false
    });
  }

  onSearch = () => {
    this.setState({ isSearching: true, showAlert: false });
    if (this.state.input) {
      setTimeout(() => {
        this.props.getMobileInfo(this.state.input, resp => {
          if (resp) {
            this.setState({
              showAlert: true,
              isSearching: false
            });
          }
        });
      }, 2000);
    }
  };

  renderAlert() {
    if (this.state.input.length !== 10) {
      return (
        <div className="alert alert-danger">
          <strong>
            Sorry! We can't find the information from your search.{" "}
          </strong>
        </div>
      );
    }
  }

  render() {
    const { data, isSearching, showAlert } = this.state;

    return (
      <div>
        <div style={styles.container}>
          <div style={styles.inputGroup}>
            <input
              type="number"
              className={"form-control"}
              style={styles.inputText}
              placeholder={"Mobile Number"}
              onChange={e => this.setState({ input: e.target.value })}
            />
            <p style={styles.info}>Enter a mobile number.</p>

            {showAlert && this.renderAlert()}
          </div>
          <button
            className={"btn btn-success"}
            style={styles.btn}
            onClick={this.onSearch}
          >
            Search
          </button>
        </div>

        {isSearching && <div id={"html-spinner"} />}

        {!_.isEmpty(data) &&
          !isSearching && (
            <div className={"card"}>
              <div className={"container"}>
                <p>Provider: {data.Provider}</p>
                <p>Service {data.Service}</p>
                <p>Series: {data.Series}</p>
                <p>Number: {data.Number}</p>
              </div>
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    result: state.search.result
  };
}

export default connect(mapStateToProps, Actions)(Search);
