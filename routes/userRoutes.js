const express = require('express');
const router = express.Router();

// Import the user controller to link routes to their handler functions
const userController = require('../controllers/userController');

router.post('/signup', userController.signup); //signup
router.post('/login', userController.login); //login

router.patch('/:identifier/change-password', userController.changePassword); //change a user's password

router.route('/')
.get(userController.getAllUsers) //fitch all users
.post(userController.createUser); //create a new user

router.route('/:id')
.put(userController.updateUser) //update a user
.delete(userController.deleteUser); //delete a user


/////btw this is a free server and i made a tunnel from my labtop so the only way to see the website i have to open the labtob and server if u want to inform me other than that u can check the physical code on github.


// Export the router to be used in server.js
module.exports = router;