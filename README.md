# Role-Based Access Control (RBAC) System

## Overview
This project implements an Authentication and Authorization system using Role-Based Access Control (RBAC). Users can register, log in, and log out securely, with access to resources determined by their assigned roles (e.g., Admin, User, Moderator).

## Features

### Frontend :-
- **User Management**: View, add, edit, delete, and manage user roles and statuses.
- **Role Management**: Create and modify roles, and assign permissions to them.
- **Dynamic Permissions**: Assign or remove specific permissions (Read, Write, Delete etc.) to roles, enabling role-based actions for users.

### Backend :-
- **User Registration**: Users can create accounts securely.
- **User Login/Logout**: Secure authentication with session management.
- **Role Management**: Different roles with specific permissions.
- **JWT Authentication**: Secure token-based authentication.
- **RBAC Implementation**: Access control based on user roles.



## Technologies Used

### Frontend :-
- **Library & Language**: React, TypeScript
- **UI Framework**: Material UI
- **Routing**: React Router DOM

### Backend :-
- **Frameworks & Library**: Node.js, Express
- **Database**: MongoDB (or your chosen database)
- **Authentication**: JSON Web Tokens (JWT)
- **Libraries**: bcrypt for password hashing, mongoose for MongoDB interaction

---


### Instructions for Use
1. **Insert the Workflow Section**: Add the above code block to your README under a new section titled "Workflow".
2. **Adjust as Necessary**: Make any changes to the text or structure to better fit your project specifics.

### Example README Section

```markdown
## Workflow

```mermaid
graph TD;
    A[User Interface] -->|Register/Login| B[Frontend (React, TypeScript)];
    B -->|API Calls| C[Backend (Node.js, Express)];
    C -->|Database Operations| D[Database (MongoDB)];
    C -->|JWT Token| E[Authentication];
    B -->|Manage Users/Roles| F[User Management];
    B -->|Dynamic Permissions| G[Role Management];
    F -->|View/Edit/Delete| D;
    G -->|Assign/Remove Permissions| D;

    subgraph Frontend
        B
        F
        G
    end

    subgraph Backend
        C
        E
    end

    subgraph Database
        D
    end



---

## Project Set Up Instructions
---
### Clone the repository
1. Fork this repository.
2. Clone the repository:
```
https://github.com/shubhamraj-24/RBAC-VRV-Security.git`
```

### Configure the client

1. Navigate to client folder:
```
cd client
```
2. Install required packages:
```
npm install`
```

### Configure the server

1. Navigate to server folder:
```
cd client
```
3. Install required packages:
```
npm install
```
5. Set up the database and configure the environment variables by following the instructions in the next steps.

### Set up the database

1. Create a MongoDb Atlas Account or MongoDb Compass and create a new database.
2. Create a `.env` file in the server folder and add the following environment variables:

```
PORT= <port_to_run_node_server>
MONGODB_URL= <mongodb_connection_string>
MONGO_DB_URL_MANAGEMENT= <mongodb_connection_string>
TOKEN_SECRET= <JWT_secret_key>

```

### Run the application

#### Run the server first

1. Navigate to server folder: `cd server`
2. Start Client : `npm start`
3. Server will be running at `http://localhost:5001`

#### Now Run the client

1. Navigate to server folder: `cd client`
2. Start Client : `npm start`
3. Open the application in your browser at `http://localhost:3000`
