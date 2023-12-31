const express = require('express');
const { query, validationResult, body } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = "Hridhima$react"

// ROUTE 1 : Creating a user using : Post/api/auth/createuser  . no login required

router.post('/createuser', [
  body('name', 'Enter a valid Name').isLength({ min: 4 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password').isLength({ min: 5 }),

], async (req, res) => {

  // if there are errors, return bad request and the errors

  const result = validationResult(req);
  if (!result.isEmpty()) {
  return res.send({ errors: result.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt)
    try {
      const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      });

      const data = {
      user: {
      id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    // res.json(user);

    res.json({ authtoken });

  } catch (error) {
    if(error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ROUTE 2 : Authenticating a user using : Post/api/auth/login  . no login required

  router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', "password cannot be blank").exists(),
], async (req, res) => {

  // if there are errors, return bad request and the errors
  const result = validationResult(req);
  if(!result.isEmpty()) {
  return res.send({ errors: result.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
    return res.status(400).json({ error: "Please try to login with correct Credentials" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
    return res.status(400).json({ error: "Please enter valid correct Credentials" })
    }

    const data = {
    user: {
    id: user.id
     }
    };

    const authtoken = jwt.sign(data, JWT_SECRET)
    res.json({ authtoken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

}),
// ROUTE 3 : Get Loggedin user details using : Post/api/auth/getuser  . login required
router.post('/getuser' , fetchuser , async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})
  module.exports = router;