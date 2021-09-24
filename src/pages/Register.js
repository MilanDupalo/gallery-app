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
      <form className="formRegistarAndLogin" onSubmit={handleSubmit}>
        <h2 className="formRegistarAndLogin--title">Register</h2>
        <div>
          <input
            className="loginField"
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
            className="loginField"
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
            className="loginField"
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
            className="loginField"
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
            className="loginField"
            required
            type="password"
            placeholder="Confirm password"
            value={userData.password_confirmation}
            onChange={({ target }) =>
              setUserData({ ...userData, password_confirmation: target.value })
            }
          />
        </div>

        <div className="terms">
          <input
            required
            type="checkbox"
            checked={userData.terms}
            onChange={({ target }) =>
              setUserData({ ...userData, terms: target.checked })
            }
          />
          <label className="terms-label">Terms</label>
        </div>

        <button className="form-btn">Register</button>
      </form>
    </div>
  );
}
