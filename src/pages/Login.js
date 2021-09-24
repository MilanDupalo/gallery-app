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
  }

  return (
    <div>
      <form className="formRegistarAndLogin" onSubmit={handleSubmit}>
        <h2 className="formRegistarAndLogin--title">Login</h2>
        <div>
          <input
            className="loginField"
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
            className="loginField"
            required
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>

        <button className="form-btn">Login</button>
      </form>
    </div>
  );
}
