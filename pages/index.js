import Link from "next/link";
import react from "react";
// import dbConnect from "../backLib/dbConnect";
import User from "../models/user";
export default function Home() {
  const [todos, settodos] = react.useState([]);
  // const user=JSON.parse(user1)
  // console.log(user)
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
      <ul>
        <li>
          <Link href="/createTodo" as="/createTodo" passHref>
            <a>add Todo</a>
          </Link>
        </li>
        <li>
          <Link href="/a" as="/b">
            <a>b</a>
          </Link>
        </li>
      </ul>
      <div>
        {todos.map((todo) => {
          return (
            <div>
              <br />
              title:{todo.title}
              <br />
              expire:{todo.expires_at}
              <Link href={"/update?id=" + todo._id} passHef>
                <a>
                  <button>update</button>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export async function getServerSideProps({ query }) {
//   await dbConnect();
//   const user = await User.findOne({ email: query.id })
//     .populate("todos")
//     .lean();
//   return {
//     props: {
//       user1: JSON.stringify(user),

//     },
//   };
// }
