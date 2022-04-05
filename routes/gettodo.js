const express = require("express");
const Todo = require("../models/todo");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query.id);
  Todo.findOne({ _id: req.query.id })
    .populate('nested_todos')
    .then((doc) => {
      res.json(doc);
    });
  // res.json({msg:'hi'})
});

module.exports = router;
