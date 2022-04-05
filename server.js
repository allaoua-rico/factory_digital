const express = require("express");
const { default: mongoose } = require("mongoose");
const next = require("next");
const sendEmail = require("./backLib/sendEmail.js");
const a = require("./routes/createTodo.js");
const User = require("./models/user");
const Todo = require("./models/todo");
const loginRouter = require("./routes/login.js");
const createTodo = require("./routes/createTodo.js");
const todoRouter = require("./routes/todos.js");
const gettodoRouter = require("./routes/gettodo.js");
const update = require("./routes/update.js");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
if (dev) {
  require("dotenv").config();
}
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));
console.log(new Date().toISOString())

// function getAllTimers() {
User.find({}, { todos: 1, email: 1 })
  .populate("todos")
  .lean()
  .then((docs) => {
    let userArray = [];
    let array = [];
    // console.log(docs[0].todos);
    docs.map((user) => {
      user.todos.map((todo) => {
        todo.checked == false && new Date(todo.expires_at)<new Date() &&
          array.push({ expires_at: todo.expires_at, title: todo.title });
// console.log(new Date(todo.expires_at)>new Date())

        if (todo.nested_todos?.length > 0) {
          todo.nested_todos.map((todo) => {
            todo.checked == false &&
              array.push({ expires_at: todo.expires_at, title: todo.title });
          });
          // array.push(todo.expires_at);
        }
      });
      userArray.push({ email: user.email, todos: array });
    });
    userArray.map(async (user) => {
      if (user.todos.length > 0) {
        console.log(user.email);
        await sendEmail(
          user.email,
          "Todos en retard",
          // 'todos'
          ''+
          ` ${user.todos.map((todo) => {
            return "votre  todos " + todo.title + " est en retard";
          })} `+''
        );
      }
    });
    console.log(array);

    // console.log(userArray);

    // array.push()
  });
// Todo.find({}, )
// // .populate('todos')
//   .lean()
//   .then((docs) => console.log(docs));
// }
app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  //timer for todo
  // server.setTimeout(500000);
  // await
  server.use("/api/login", loginRouter);
  server.use("/api/todos", todoRouter);
  server.use("/api/gettodo", gettodoRouter);
  server.use("/api/createTodo", createTodo);
  server.use("/api/update", update);

  
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
