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
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        {isAuthenticated ? (
          <h3 className="active-user">
            Welcome back {activeUser && activeUser.firstName}
          </h3>
        ) : (
          <h3 className="active-user">Hello people,enjoy in our app</h3>
        )}
        {isAuthenticated ? (
          <>
            <li>
              <Link className="nav-link" to="/create-galleries">
                Create gallery
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/my-galleries">
                My galleries
              </Link>
            </li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
}
