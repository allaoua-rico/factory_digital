const express = require("express");
const Todo = require("../models/todo");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  Todo.updateOne(
    { _id: req.body.id },
    {
      title: req.body.title,
      expires_at: req.body.expires_at,
      desc: req.body.desc,
      checked: req.body.checked,
      nested_todos: req.body.nested_todos,
    }
  ).then((doc) => {
    console.log(doc);
    res.json({ doc: doc });
  });
  //   res.json({ msg: "hi" });
});

module.exports = router;
