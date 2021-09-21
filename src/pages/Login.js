import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";
import { useHistory } from "react-router";

export default function Login() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login(credentials));
    history.push("/");
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            required
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={({ target }) =>
              setCredentials({ ...credentials, email: target.value })
            }
          />
        </div>
        <div>
          <input
            required
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
}
