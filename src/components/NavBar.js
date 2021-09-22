import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectActiveUser, selectIsAuthenticated } from "../store/auth";

export default function NavBar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <h3 className="active-user">
            Hello {activeUser && activeUser.firstName}
          </h3>
        ) : (
          <h3 className="active-user">Hello</h3>
        )}
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/create-gallery">Create gallery</Link>
            </li>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
}
