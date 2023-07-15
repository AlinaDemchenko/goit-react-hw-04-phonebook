import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Filter from './Filter/Filter';

export function App () {

  const [contacts, setContacts] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const storageContacts = localStorage.getItem('contacts');
    storageContacts && setContacts(JSON.parse(storageContacts));
  }, [setContacts])

  useEffect(() => {
    if (!contacts.length) return;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, filterValue])

  const onDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const onAddContact = contactData => {
    const checkedContact = contacts.find(
      contact => contactData.name === contact.name
    );
    if (checkedContact) {
      alert(`${contactData.name} is already in contacts`);
      return;
    } else {
      const newContact = { id: nanoid(), ...contactData };
      setContacts([newContact, ...contacts]);
    }
  };

  const onFilter = filterData => {
    setFilterValue( filterData );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name
      .toLowerCase()
      .includes(filterValue.toLowerCase().trim()));

    return (
      <Section>
        <h1>
          <span>☎︎ </span>Phonebook
        </h1>
        <Form onAddContact={onAddContact} />
        <h2>Contacts</h2>
        <Filter onFilter={onFilter} filter={filterValue} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      </Section>
    );
  }
