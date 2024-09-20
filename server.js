// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contacts = require('./contacts'); 

// Initialize Express app
const app = express();

// Middleware for serving static files
app.use(express.static('public'));

// Enable CORS for cross-origin resource sharing
app.use(cors());

// Default route providing API usage instructions
app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the Address Book API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'anything' }})

    The following endpoints are available:

    GET /contacts
    DELETE /contacts/:id
    POST /contacts { name, surname, email }
  </pre>
  `;
  res.send(help);
});

// Authorization middleware: check for Authorization header
app.use((req, res, next) => {
  const token = req.get('Authorization');

  if (token) {
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself',
    });
  }
});

// Route to get contacts for the authorized user
app.get('/contacts', (req, res) => {
  const userContacts = contacts.get(req.token);
  res.send(userContacts);
});

// Route to delete a contact by ID
app.delete('/contacts/:id', (req, res) => {
  const result = contacts.remove(req.token, req.params.id);
  res.send(result);
});

// Route to add a new contact
app.post('/contacts', bodyParser.json(), (req, res) => {
  const { name, surname, email } = req.body;

  if (name && surname && email) {
    const newContact = contacts.add(req.token, req.body);
    res.send(newContact);
    console.log(newContact);
  } else {
    res.status(403).send({
      error: 'Please provide both a name, surname email',
    });
  }
});

// Start the server and listen on the configured port from the .env file
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', PORT);
});