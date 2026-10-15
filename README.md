# RentHub

RentHub is a listing-based web application for finding places to stay. Users can browse listings, create an account, manage their own listings, and leave reviews.
## Implemented so far

- Browse all listings and view listing details
- Create, edit, and delete listings
- Associate listings with their owners
- Sign up, log in, and log out
- Authenticate users with Passport Local and session-based login
- Redirect unauthenticated users to the login page when they try to create listings or interact with reviews
- Allow listing owners to edit and delete their listings
- Add reviews/comments and allow review authors to delete their reviews
- Validate listing and review input with Joi
- Display success/error flash messages and a custom 404/error page
- Render pages with EJS templates, a shared layout, and public CSS/JavaScript
- Store listing, user, and review data in MongoDB
- Include sample listing data for database seeding

## Technologies

- Node.js and Express
- MongoDB and Mongoose
- EJS and EJS-Mate
- Passport, Passport Local, and Passport Local Mongoose
- Express Session and Connect Flash
- Joi
- Method Override

## Run locally

### Requirements

- Node.js and npm
- MongoDB running locally

The application connects to the `renthub` database at:

```text
mongodb://127.0.0.1:27017/renthub
```

### Steps

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start MongoDB.

3. Start the application:

   ```bash
   node app.js
   ```

4. Open [http://localhost:5173/listing](http://localhost:5173/listing) in your browser.

The project does not yet define a `start` script or a working test suite. Running `npm test` currently prints “no test specified.”

## Project structure

```text
controler/   Request handlers/controllers
init/        Sample data and database seed script
models/      Mongoose models and schemas
public/      CSS and browser-side JavaScript
routes/      Listing, user, and review routes
utils/       Error class and async wrapper
views/       EJS pages, layouts, and shared partials
app.js       Express app, middleware, and MongoDB connection
midleware.js Authentication, authorization, and validation middleware
schema.js    Joi validation schemas
```

## Known limitations and next steps

- Booking, payment, search, and filtering features have not been implemented yet.
- A test suite and an npm start script have not been set up.
- `routes/review.js` uses the `isLoggedIn` middleware but does not import it. This can cause an application startup error; fix the import before following the run instructions above.
- The session secret is hard-coded in `app.js`; move it to an environment variable before using the application in production.
- Before running the seed script, make sure the owner ID in `init/index.js` matches a user that exists in the database.
