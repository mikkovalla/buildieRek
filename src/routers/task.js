const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const { response } = require('express');
const User = require('../models/user');
const router = new express.Router();

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find({}).populate('user', {
    owner: req.user._id
  })
  res.status(200).json(tasks.map(Task.format))
})

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
      ...req.body,
      owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;