import react from "react";
import { useEffect } from "react";
import { useStateValue } from "../components/stateProvider";

export default function A() {
  const [i, setI] = react.useState(1);
  const [todos, settodos] = react.useState([]);

  // const [checked, setchecked] = react.useState(false)

  const [{ user }, dispatch] = useStateValue();
  let todo = {};

  function handlesubmit() {
    fetch("/api/createTodo", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }
  react.useEffect(() => {
    // console.log(user?.username);
    // console.log(document.getElementById("title")?.value);
    // console.log(document.getElementById("description")?.value);
    // console.log(document.getElementById("date")?.value);
    // console.log(document.getElementById("checked")?.value);
    console.log(document.getElementById("nested_todos")?.value);

    
    todo = {
      username: user?.username,
      title: document.getElementById("title")?.value,
      description: document.getElementById("description")?.value,
      date: document.getElementById("date")?.value,
      checked: document.getElementById("checked")?.checked,
      todos: document.getElementById("nested_todos")?.value,

    // console.log(document.getElementById("nested_todos")?.value);

    };
    console.log(todo);
  }, [i]);
  react.useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("storageUser")));
    fetch("/api/todos", {
      method: "post",
      headers: {
        // "x-access-token": user.token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(JSON.parse(localStorage.getItem("storageUser"))),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res[0].todos);
        settodos(res[0].todos);
      });
  }, []);

  return (
    <div>
      <a href="/">home</a>

      <form action="" method="post">
        title
        <input
          onChange={() => setI(i + 1)}
          id="title"
          type="text"
          name="title"
          required
        />
        <br />
        description
        <input
          onChange={() => setI(i + 1)}
          id="description"
          type="text"
          name="description"
        />
        <br />
        date
        <input onChange={() => setI(i + 1)} id="date" type="date" name="date" />
        <br />
        <input
          onChange={() => {
            // setchecked(!checked);
            setI(i + 1);
          }}
          id="checked"
          type="checkbox"
          name="checked"
        />
        <br />
        <select
          name="nested_todos"
          id="nested_todos"
          onChange={() => {
            setI(i + 1);
          }}
        >
          {todos?.map((todo) => {
            return <option value={todo._id}>{todo.title}</option>;
          })}
        </select>
        <button onClick={handlesubmit} type="button">
          submit
        </button>
      </form>
    </div>
  );
}
