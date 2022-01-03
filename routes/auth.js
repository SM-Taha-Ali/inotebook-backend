const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// Importing controller

const authController = require('../controllers/auth');
const fetchuser = require('../middlewares/fetchUser');


// Creating User
router.post(
  // Route Path
  '/create-user',
  // Express validations
  [
    body('name', 'Name must be atleast 3 characters long.').isLength({ min: 3 }),
    body('email','Enter a valid email.').isEmail(),
    body('password','Password must be atleast 5 characters long.').isLength({ min: 5 }),
  ], 
  // Creating User
  authController.createUser
)


// Authenticating User
router.post(
  // Route Path
  '/login',
  // Express validations
  [
    body('email','Enter a valid email.').isEmail(),
    body('password','Password cannot be blank.').exists(),
  ], 
  // Authenticating User
  authController.loginAuth
)


// Fetching user details
router.post(
  // Route Path
  '/getuser',
  // MiddleWare
  fetchuser,
  // Authenticating User
  authController.getUser
)



module.exports = router;