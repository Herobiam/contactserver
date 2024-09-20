const contactsModule = require('./contacts'); // Path to the contacts module
const clone = require('clone');

describe('Contacts - Add Function', () => {
  let token = 'test-token';

  // Mock contact to add
  const newContact = {
    name: 'John Doe',
    surname: 'Mathew',
    email: 'makafa@gmail.com',
  };

  // Reset the database before each test to avoid side effects
  beforeEach(() => {
    contactsModule.get(token); // Initialize data for the token
  });

  it('should add a new contact to the contacts list', () => {
    const addedContact = contactsModule.add(token, clone(newContact));

    // Assert that the added contact has the expected properties
    expect(addedContact).toHaveProperty('id');
    expect(addedContact.name).toBe(newContact.name);
    expect(addedContact.handle).toBe(newContact.handle);

    // Verify that the contact was added to the contact list
    const contactsList = contactsModule.get(token).contacts;
    expect(contactsList).toContainEqual(addedContact);
  });

  it('should preserve the ID if one is provided', () => {
    const contactWithId = { ...newContact, id: 'custom-id' };
    const addedContact = contactsModule.add(token, clone(contactWithId));

    // Assert that the contact retains the provided ID
    expect(addedContact.id).toBe('custom-id');

    const contactsList = contactsModule.get(token).contacts;
    expect(contactsList).toContainEqual(addedContact);
  });
});