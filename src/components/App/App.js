import React, { Component } from 'react';
import shortid from 'shortid';
import { toast } from 'react-toastify';

import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import methods from '../../utils/methods';

import styles from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

const { save, get } = methods;

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (get('contacts')) {
      this.setState({
        contacts: [...get('contacts')],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      save('contacts', this.state.contacts);
    }
  }

  changeFilter = filter => {
    this.setState({ filter });
  };

  addContact = contact => {
    const isContactExist = this.state.contacts.some(
      savedContact =>
        savedContact.name.toLowerCase() === contact.name.toLowerCase(),
    );

    if (isContactExist) {
      toast.configure();
      toast.error(`${contact.name} is already in contacts.`);
    } else {
      const contactToAdd = {
        ...contact,
        id: shortid.generate(),
      };
      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd],
      }));
    }
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
      filter: '',
    }));
  };

  filterContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length > 2 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {contacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
