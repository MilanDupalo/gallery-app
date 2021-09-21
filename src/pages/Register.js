import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/auth";
import { useHistory } from "react-router";

export default function Register() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: "",
  });

  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(register(userData));
    history.push("/");
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            required
            placeholder="firstName"
            value={userData.firstName}
            onChange={({ target }) =>
              setUserData({ ...userData, firstName: target.value })
            }
          />
        </div>
        <div>
          <input
            required
            placeholder="lastName"
            value={userData.lastName}
            onChange={({ target }) =>
              setUserData({ ...userData, lastName: target.value })
            }
          />
        </div>
        <div>
          <input
            required
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={({ target }) =>
              setUserData({ ...userData, email: target.value })
            }
          />
        </div>
        <div>
          <input
            required
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={({ target }) =>
              setUserData({ ...userData, password: target.value })
            }
          />
        </div>
        <div>
          <input
            required
            type="password"
            placeholder="Confirm password"
            value={userData.password_confirmation}
            onChange={({ target }) =>
              setUserData({ ...userData, password_confirmation: target.value })
            }
          />
        </div>

        <div>
          <label>Terms</label>
          <input
            required
            type="checkbox"
            checked={userData.terms}
            onChange={({ target }) =>
              setUserData({ ...userData, terms: target.checked })
            }
          />
        </div>

        <button>Register</button>
      </form>
    </div>
  );
}
