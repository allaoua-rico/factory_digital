import react from "react";
// import { useStateValue } from "../frontLib/stateProvider";
import { useRouter } from "next/router";
import { useStateValue } from "../components/stateProvider";

export default function B() {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();

  function login() {
    // e.preventDefault();
    console.log(document.getElementById("email").value)
    fetch("/api/login", {
      method: "post",
      headers: {
        // "x-access-token": user.token,
          "Content-type": "application/json",
      },
      body: JSON.stringify({ email: document.getElementById("email").value }),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.email) {
          dispatch({
            type: "SET_USER",
            user: {
              username: res.email,
              // token: data.token,
              // role: data.role[0],
            },
          });
        }
        console.log(res)});
  }
  react.useEffect(() => {
    if (user) {
      // console.log(user);
      localStorage.setItem("storageUser", JSON.stringify(user));
      let saved = JSON.parse(localStorage.getItem("storageUser"));
      if (saved) {
         router.push("/")
      }
    }
  }, [user]);
  return (
    <div>
      <h1>login page</h1>
      <a href="/">home</a>

      <form onSubmit={login} action="" method="post">
        email
        <input
          value={"allaoua.boudriou@gmail.com"}
          type="text"
          id='email'
          name="email"
          required
        />
        <button onClick={login} type="button">
          login
        </button>
      </form>
    </div>
  );
}
