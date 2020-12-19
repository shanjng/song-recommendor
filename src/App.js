import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>

        <Switch>
          {/* I think it's purposely backwards for longest-prefix matching */}
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Login() {
  return (
    <div>
      <div id="login">
        <h1>This is an example of the Authorization Code flow</h1>
        <a href="/login" class="btn btn-primary">Log in with Spotify</a>
      </div>
      <div id="loggedin">
        <div id="user-profile">
        </div>
        <div id="oauth">
        </div>
        <button class="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="App">
        <div className="App-section section-1">
          <div className="center-text">
            Now Playing <br></br>
            Luis Fonsi - Despacito ft. Daddy Yankee
          </div>
        </div>
        <div className="App-section section-2">
          <div className="center-text">
            Recommended <br></br>
            Silk City, Dua Lipa - Electricity
          </div>
        </div>
    </div>
  );
}