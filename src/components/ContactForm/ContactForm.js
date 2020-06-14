import React, { Component } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import styles from "./ContactForm.module.css";

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddContact({ ...this.state });

    this.setState({
      name: "",
      number: "",
    });
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div>
          <label className={styles.formLabel} htmlFor={this.nameInputId}>
            Name
          </label>
          <input
            className={styles.formInput}
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
            id={this.nameInputId}
            required
          />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor={this.numberInputId}>
            Number
          </label>
          <input
            className={styles.formInput}
            type="tel"
            value={number}
            onChange={this.handleChange}
            name="number"
            id={this.numberInputId}
            required
          />
        </div>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
