import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import { getActiveUser, selectIsAuthenticated } from "./store/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GuestRoute from "./components/shared/GuestRoute";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route extact path="/register">
            <Register />
          </Route>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
