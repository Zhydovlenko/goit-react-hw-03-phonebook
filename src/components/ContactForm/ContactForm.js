import React, { Component } from 'react';
import PropTypes from 'prop-types';

import generateId from '../../utils/generateId';

import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onAddContact({ ...this.state });

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const { nameInputId, numberInputId } = generateId;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div>
          <label className={styles.formLabel} htmlFor={nameInputId}>
            Name
          </label>
          <input
            className={styles.formInput}
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
            id={nameInputId}
          />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor={numberInputId}>
            Number
          </label>
          <input
            className={styles.formInput}
            type="tel"
            value={number}
            onChange={this.handleChange}
            name="number"
            id={numberInputId}
          />
        </div>
        <button type="submit" disabled={!name.length || !number.length}>
          Add contact
        </button>
      </form>
    );
  }
}
