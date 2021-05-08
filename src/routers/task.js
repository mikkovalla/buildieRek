const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const {
  response
} = require('express');
const User = require('../models/user');
const router = new express.Router();

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/tasks', auth, async (req, res) => {
  const countTasks = await Task.countDocuments()

  const {
    completed,
    latestFirst,
    oldestFirst
  } = req.query
  const limit = parseInt(req.query.limit || 10)
  const page = parseInt(req.query.page || 1)

  const tasks = await Task.find({})
    .populate('user', {
      owner: req.user._id
    })
    .limit(limit)
    .skip((page - 1) * limit)

  //sort tasks by completed status
  if (completed !== undefined) {
    if (completed === 'true') {
      tasks.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1)
    }
    if (completed === 'false') {
      tasks.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1)
    }
  }
  //sort tasks by date
  if (oldestFirst) {
    tasks.sort((a, b) => b.createdAt - a.createdAt)
  }
  if (latestFirst) {
    tasks.sort((a, b) => b.createdAt - a.createdAt).reverse()
  }

  const formattedTasks = tasks.map(Task.format)

  res.status(200).json({
    task: formattedTasks,
    pages: Math.ceil(countTasks / limit),
    currentPage: page
  })
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