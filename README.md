# PetShare App

This app was created during the [Neue Fische](https://www.neuefische.de/) Web Development Bootcamp in Hamburg. It's goal is to put pet owner in contact with people that love animals and want to have the chance to spend time with one. The pet owner can create a profile for his pet. People interested in spending time with a pet can go throw the listing and contact the owner. 

## preview

![petShare](https://res.cloudinary.com/petshare-de/image/upload/v1572209577/Sayuri_Wichmann_PesShare_b7cs0p.png)


## Technical Information

- MongoDB
- Express.js
- React
- Node.js

- React-router-dom
- MongoDB
- npm
- nodemon
- mongoose
- styled-components
- passport.js



## Runs on localhost

### Requirements

- Node.js
- MongoDB runns on **localhost:27017**

## Setup

``git@github.com:sayuriw/petShare.git``
``cd petshare``<br/>
``npm start``

### Cloudinary

- An account by [Cloudinary](https://cloudinary.com) will me necessary.
- Anable unsigned uploading
- Copy the preset name (the 8 character hash below name)
- Create a `.env.local` file in the root directory of this project and add your cloudname and preset:
```
REACT_APP_CLOUDINARY_CLOUDNAME='your_cloudname'
REACT_APP_CLOUDINARY_PRESET='your_preset'
```
