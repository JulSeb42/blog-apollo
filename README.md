# Blog CMS

A simple blog with CMS made with React, Apollo Server and MongoDb.

## How to use

Download the project, run `yarn`, then create a `.env` file in the root folder with this data:

```
PORT=5005
API_PORT=4000
MONGODB_URI=mongodb://localhost/blog-apollo
ORIGIN=http://localhost:3000

TOKEN_SECRET=RanDomSecREtKey42

EMAIL=your.email@gmail.com
WORD=YourPassword

SERVER_SMTP=YourServerSMTP
PORT_SMTP=YourPortSMTP

CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

Then, open the folder `server/db/exports-db` and import all the JSON data to MongoDb to add fake data.

## Features

- Users can not access the dashboard before an admin approves them
- User roles: users can either be a writer (who can only add, edit or delete posts), a moderator (writer features, plus delete comments), and admin (writer and moderator features, plus edit global pages and users)
- Add / delete posts
- Add / delete global pages
- Post comments to posts
- Contact form, to the specified address in dashboard