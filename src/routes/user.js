import { Router } from 'express';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

// @route POST /users
// @desc Register user
// @access Public
router.post('/', async (req, res) => {
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        req.context.models.User.create({
          username: req.body.username,
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: hash
        }).then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  return res.send(user);
});

// @route POST users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

const email = req.body.email;
const password = req.body.password;

// Find user by email
req.context.models.User.findOne({ 
    where: { 
      email: email
    } 
 }).then(user => {

  console.log(JSON.stringify(user))
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          first_name: user.first_name
        };
// Sign token
        jwt.sign(
          payload,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err) => {
            res.json({
              success: true,
              token: "Bearer secret",
              id: user.id
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});


export default router;
