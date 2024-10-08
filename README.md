
# Simple Express Server

This is a basic Express server that provides an API for managing contacts.

## Features
- Simple API for adding, deleting, and retrieving contacts
- Uses `dotenv` to load environment variables from a `.env` file
- Supports CORS for cross-origin requests

## Prerequisites

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)

## Installation

1. **Clone the repository**:

   ```bash
  (https://github.com/Herobiam/contactserver.git)
   cd contactserver
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:

   ```
   ORIGIN=http://localhost:3000
   ```


4. **Run the server**:

   ```bash
   npm start
   ```

   By default, the server will run on the port specified in the `.env` file (e.g., `http://localhost:3000`).

## API Endpoints

### 1. **GET /contacts**

   Retrieves the list of contacts for the user identified by the `Authorization` header.

   **Example request**:

   ```bash
   curl -H "Authorization: your-token" http://localhost:3000/contacts
   ```

### 2. **POST /contacts**

   Adds a new contact for the user.

   **Request body** (JSON):
   ```json
   {
      name: 'First National Bank',
      surname: 'Bank',
      email: 'contact@fnb.com',
    },
   ```

   **Example request**:

   ```bash
   curl -X POST -H "Content-Type: application/json" -H "Authorization: your-token"    -d '{"name": "John Doe", "surname": "mkafa", "email": "makafa@d.com"}'    http://localhost:3000/contacts
   ```

### 3. **DELETE /contacts/:id**

   Deletes a contact by its `id`.

   **Example request**:

   ```bash
   curl -X DELETE -H "Authorization: your-token"    http://localhost:3000/contacts/contact-id
   ```

## License

This project is licensed under the MIT License.
