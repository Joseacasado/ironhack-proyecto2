# Second project at Ironhack Madrid

Module two project based on ExpressJS, NodeJS, AJAX, MongoDB and CRUD operations

## Install

- Run `npm i` on the root directory

## Run

- Create a `.env` file on the root directory to populate the database (`DB`), port (`PORT`), TicketMaster Api Key (`TM_API`), google Maps Api Key (`GOOGLEMAPS_API`),
cloudinary config ((`CLOUDINARY_NAME`), (`CLOUDINARY_KEY`), (`CLOUDINARY_SECRET`)) and nodemailer config ((`EMAILUSER`), (`EMAILPWD`)).
- Include your TicketMaster Api Key in (`public/javascripts/ticketmaster-api/api-handler.js`) axios (`baseURL`).
- Run `npm run dev` command on the root directory

## Endpoints table

| ROUTE | METHOD | DESCRIPTION |
| :--- | :---: | :--- |
| / | `GET` | Landing Page |
| /signup | `GET` | Show user sign up form |
| /signup | `POST` | New user register |
| /login | `GET` | Show login form |
| /login | `POST` | User login |
| /logout | `GET` | User logout |
| /profile | `GET` | Show user profile page |
| /profile/edit | `GET` | Show user profile edit form |
| /profile/edit | `POST` | Edit user profile |
| /profile/edit/picture | `POST` | Upload user image |
| /profile/remove-fav/:id | `GET` | Add event to fav list |
| /profile/attend/:id | `GET` | Sends an email to the user with reminders of their favorite events |
| /events | `GET` | Show events list |
| /events/details/:id | `GET` | Show event details |
| /events/create | `GET` | Show event create form |
| /events/create | `POST` | Create event |
| /events/:id/edit | `GET` | Show event edit form |
| /events/:id/edit | `POST` | Edit event |
| /events/:id/delete | `POST` | Delete event |
| /events/edit/picture | `POST` | Upload event image |
| /api | `GET` | Aply filters and take .json from data base |
| /api/:id | `GET` | Take .json from data base and update Gmaps marker |
| /api/add-event/:id | `GET` | Save event to user's fav list |
