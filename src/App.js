import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import AppGalleries from "./pages/AppGalleries";
import SingleGallery from "./pages/SingleGallery";
import Authors from "./pages/Authors";
import MyGalleries from "./pages/MyGalleries";
import CreateGalleries from "./pages/CreateGalleries";
import { getActiveUser, selectIsAuthenticated } from "./store/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GuestRoute from "./components/shared/GuestRoute";
import PrivateRoute from "./components/shared/PrivateRoute";

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
          <Route exact path="/galleries">
            <AppGalleries />
          </Route>
          <Route exact path="/galleries/:id">
            <SingleGallery />
          </Route>
          <Route exact path="/authors/:id">
            <Authors />
          </Route>
          <PrivateRoute exact path="/create-galleries">
            <CreateGalleries />
          </PrivateRoute>
          <PrivateRoute exact path="/edit-galleries/:id">
            <CreateGalleries />
          </PrivateRoute>
          <PrivateRoute exact path="/my-galleries">
            <MyGalleries />
          </PrivateRoute>
          <GuestRoute extact path="/register">
            <Register />
          </GuestRoute>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          <Route exact path="/">
            <Redirect to="/galleries" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
