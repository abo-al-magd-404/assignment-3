# Assignment 3 – User Management REST API

This repository provides a Node.js application implementing a simple user management REST API. It enables creation, retrieval, filtering, updating, and deletion of user records stored in a local JSON file. The project demonstrates backend CRUD operations using the Express framework, and includes a sample users dataset. It is suitable as a backend assignment, learning resource, or a lightweight foundation for more complex CRUD systems.

## Features

- **RESTful API for User Management**
  - Create, update, delete, and search user records.
  - Endpoints for user listing, details, name-based search, and age filtering.
- **Persistent Storage**
  - User data is stored in a flat JSON file (`usersFile.json`) for simplicity and transparency.
- **Express.js Application**
  - Modern Express (v5) with JSON request handling.
- **Sample Dataset Included**
  - Pre-populated `usersFile.json` with realistic user profiles.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Sample Data](#sample-data)
- [Bonus Algorithm](#bonus-algorithm)
- [Setup & Usage](#setup--usage)
- [Entity Relationship Diagram (ERD)](#entity-relationship-diagram-erd)

## Tech Stack

- **Node.js** (CommonJS modules)
- **Express** v5.2.1
- No external database; uses the filesystem (Node.js `fs/promises`)
- Runs on port `3000` by default

## Architecture

- **Entry Point:** `Part-1/main.js`
- **Configuration:** `Part-1/package.json`  
  - `start` script: `node --watch main.js`
- **Data File:** `Part-1/usersFile.json`  
  - Array of user objects (id, name, age, email)

### Directory Structure

```
assignment-3/
├── .gitignore
├── Bounus.js                   # Bonus algorithm file (see below)
├── Part-1/
│   ├── main.js                 # Express API server source code
│   ├── package.json
│   ├── package-lock.json
│   └── usersFile.json          # Sample user data (JSON)
├── Part-2 ERD Diagram.png      # Visual ERD for users entity
└── README.md
```

## API Reference

All endpoints are under the base URL: `http://localhost:3000/`

| Method | Endpoint                | Description                                         | Body/Query                |
|--------|-------------------------|-----------------------------------------------------|---------------------------|
| GET    | `/user`                 | Get all users                                       | -                         |
| GET    | `/user/:id`             | Get user by ID                                      | -                         |
| POST   | `/user`                 | Add a new user                                      | `{ name, age, email }`    |
| PATCH  | `/user/:id`             | Update user fields by ID                            | Any fields to update      |
| DELETE | `/user/:id`             | Delete user by ID                                   | -                         |
| GET    | `/user/getByName`       | Find users by name (case-insensitive, partial match)| `?name=keyword`           |
| GET    | `/user/filter`          | Get users with minimum age                          | `?minAge=number`          |

### Example User Object

```json
{
  "id": 1,
  "name": "Mohamed Ali",
  "age": 45,
  "email": "mohamed@test.com"
}
```

## Sample Data

The `usersFile.json` contains realistic sample profiles such as:

- Mohamed Ali (45)
- Ahmed Mansour (30)
- Mariam Saleh (22)
- ...and more (19 users provided)

## Bonus Algorithm

The repository includes a JavaScript function in [`Bounus.js`](./Bounus.js) that computes the longest common prefix among a list of strings, a typical coding interview exercise. Example:

```js name=Bounus.js url=https://github.com/abo-al-magd-404/assignment-3/blob/main/Bounus.js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
};
```

## Entity Relationship Diagram (ERD)

The file [`Part-2 ERD Diagram.png`](./Part-2%20ERD%20Diagram.png) illustrates the logical data model for user entities and attributes.

## Setup & Usage

1. **Install dependencies**:
    ```bash
    cd Part-1
    npm install
    ```
2. **Start the server**:
    ```bash
    npm start
    ```
3. **API available at**: `http://localhost:3000`

## License

[ISC](https://opensource.org/licenses/ISC)

---

> _This repository is developed as an assignment project and showcases practical Express/Node.js REST API design with a focus on clarity and maintainability._
