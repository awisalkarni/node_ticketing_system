This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction

This is a simple ticket reporting system that was developed using NodeJS and ReactJS, MongoDB and ExpressJS

## Instruction

- `cd node_ticket_system/backend`
- `nodemon` to start backend server
- `cd ..`
- `npm start` to start frontend service


## Features

1. Login
2. Register
3. Authentication using jwt. Stored using localStorage
4. Can view add, view and delete tickets
5. Can add devices and priorities.
6. Can leave and view comments to tickets
7. Can logout
8. Database stored using mongodb and managed using mongoose


## Plugins used in NodeJS backend

1. bcrypt
2. bcryptjs
3. body-parser
4. cookie-parser
5. cors
6. dotenv
7. express
8. express-jwt
9. mongoose

## Plugins used in React frontend

1. axios
2. bootstrap
3. jquery
4. popper.js
5. react
6. react-bootstrap
7. react-datepicker
8. react-dom
9. react-router-dom
10. react-scripts

## Future enhancements

1. Using cookies and CSRF protection for storing jwt token to prevent XSS attack
2. Add user roles for technical support officers, admins and clients.
3. Add admin panel to manage locations, zones, devices, priorities and users.
4. Add dashboard for quick stats
5. Asset management system
