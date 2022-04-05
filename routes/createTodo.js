const express = require("express");
const Todo = require("../models/todo");
const User = require("../models/user");

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);

  new Todo({
    title: req.body.title,
    expires_at: ''+req.body.date+'',
    desc: req.body.description,
    checked: req.body.checked,
    nested_todos: req.body.nested_todos,
  })
    .save()
    .then((doc) => {
      console.log(doc);
      // User.updateOne({email:req.body.email},{
      //   todos:req.body.todos
      // })
    });

  res.json({ msg: "hi" });
});

module.exports = router;
