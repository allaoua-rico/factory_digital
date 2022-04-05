import react from "react";
import { useEffect } from "react";
import { useStateValue } from "../components/stateProvider";
import { useRouter } from "next/router";

export default function A() {
  const [todo, settodo] = react.useState({});
  // const [checked, setchecked] = react.useState(false)

  // const [{ user }, dispatch] = useStateValue();
  // let todo = {};
  const router = useRouter();

  function handlesubmit() {
    fetch("/api/update", {
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
    let params = new URL(document.location).searchParams.get("id");
    console.log(params);

    fetch("/api/gettodo?id=" + params, {
      method: "get",
      // body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((res) => settodo(res));
  }, []);
  react.useEffect(() => {
    console.log(todo);
  }, [todo]);
  return (
    <div>
      <a href="/">home</a>
      <form action="" method="post">
        title
        <input
          value={todo?.title}
          onChange={(e) => settodo({ ...todo, title: e.target.value })}
          id="title"
          type="text"
          name="title"
          required
        />
        <br />
        description
        <input
          value={todo?.desc}
          onChange={(e) => settodo({ ...todo, desc: e.target.value })}
          id="description"
          type="text"
          name="description"
        />
        <br />
        date
        <input
          onChange={(e) => settodo({ ...todo, expires_at: e.target.value })}
          id="date"
          type="date"
          name="date"
        />
        <br />
        <input
          value={todo?.checked}
          onChange={(e) => settodo({ ...todo, checked: e.target.checked })}

          id="checked"
          type="checkbox"
          name="checked"
        />
        <br />
        <button onClick={handlesubmit} type="button">
          submit
        </button>
      </form>
    </div>
  );
}
