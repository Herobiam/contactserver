const clone = require('clone');
const dotenv = require('dotenv');

dotenv.config();

const db = {};

const defaultData = {
  contacts: [
    {
      id: 'FNB001',
      name: 'First National Bank',
      surname: 'Bank',
      email: 'contact@fnb.com',
    },
    {
      id: 'PRO123',
      name: 'Protea',
      surname: 'Flowers',
      email: 'contact@protea.com'
    },
    {
      id: 'ITA001',
      name: 'IT',
      surname: 'Solutions',
      email: 'contact@it.com'
    }
  ]
};


const get = (token) => {

  let userData = db[token];

  if (userData == null) {
    userData = db[token] = clone(defaultData);
  }

  return userData;
};


const add = (token, contact) => {
  
  if (!contact.id) {
    contact.id = generateUniqueId(contact.name);
  }


  get(token).contacts.push(contact);

  return contact;
};

// Remove a contact by ID from the user's contact list
const remove = (token, id) => {
  const userData = get(token);
  const contactIndex = userData.contacts.findIndex(contact => contact.id === id);


  if (contactIndex !== -1) {
    const removedContact = userData.contacts.splice(contactIndex, 1)[0];
    return { contact: removedContact };
  } else {
    return { error: 'Contact not found' };
  }
};

const generateUniqueId = (name) => {

  let prefix = name.toUpperCase().substring(0, 3);
  
  if (prefix.length < 3) {
    prefix = prefix.padEnd(3, 'A');
  }

  const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}${randomNumber}`;
}


module.exports = {
  get,
  add,
  remove
};