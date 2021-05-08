const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
  console.log(req)
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send(User.format(user));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users/me', auth, async (req, res) => {
  try {
    const user = await User.findOne({});
    res.status(200).send(User.format(user))
  } catch (error) {
    res.status(400).send({
      Error: error
    })
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({})
    await user.remove()
    res.status(200).send(`User ${user.name} succesfully removed!`)
  } catch (error) {
    res.status(400).send({
      Error: error
    })
  }
})

router.patch("/users/me", auth, async (req, res) => {

  if (!req.body) return res.status(400).send({
    Error: "No values"
  })
  const allowedProperties = [ "name", "email", "password", "age" ];
  const values = Object.entries(req.body)
  const reqValues = Object.fromEntries(values)
  const allowedUpdate = allowedProperties.filter(property => !reqValues.hasOwnProperty(property))
  console.log(allowedUpdate)
  if(allowedUpdate.length === 4) return res.status(400).send({
    Error: "nothing to update or property names are wrong"
  })

  try { 
    const user = await User.findOne({})
    const updatedUser = await User.findByIdAndUpdate(user._id, reqValues)
    res.status(200).send(`User ${updatedUser.name} succesfully updated!`)
  } catch (error) {
    res.status(400).send({
      Error: error
    })
  }
})


module.exports = router;