# PetShare App

This app was created during the [Neue Fische](https://www.neuefische.de/) Web Development Bootcamp in Hamburg in Fall 2019. It's goal is to put pet owner in contact with people that love animals and want to have the chance to spend time with one. The pet owner can create a profile for his pet. People interested in spending time with a pet can go throw the listing and contact the owner. 

## preview
<img src="https://res.cloudinary.com/petshare-de/image/upload/v1572294309/localhost_3000__iPhone_6_7_8_y979j5.png" width='200px'/><img src="https://res.cloudinary.com/petshare-de/image/upload/v1572294288/localhost_3000__iPhone_6_7_8_1_pqagbo.png" width='200px'/>



## Tech Stack

The app was built using [create-react-app](https://github.com/facebook/create-react-app)

- MongoDB
- Express.js
- React
- Node.js

### Aditional dependencies

- React-router-dom
- cypress
- bcrypt.js
- npm
- npm-run-all
- nodemon
- mongoose
- styled-components

## Runs on localhost

### Requirements

- Node.js
- MongoDB runs on **localhost:27017**
- Cloudinary

## Setup

``git@github.com:sayuriw/petShare.git``<br/>
``cd petshare``<br/>
``npm start``

### Cloudinary

- An account by [Cloudinary](https://cloudinary.com) will be necessary.
- Enable unsigned uploading
- Copy the preset name (the 8 character hash below name)
- Create a `.env.local` file in the root directory of this project and add your cloudname and preset:
```
REACT_APP_CLOUDINARY_CLOUDNAME='your_cloudname'
REACT_APP_CLOUDINARY_PRESET='your_preset'
```

### Run the app in development mode

`npm start`

Open http://localhost:3000 on the browser to see the app. 
