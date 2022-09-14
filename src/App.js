import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RedirectPage from './pages/RedirectPage';
import PlaylistsPage from './pages/PlaylistsPage';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  // useEffect(() => {
  //   console.log(window.location);
  //   console.log('running at: ', window.location.pathname);
  // });

  return (
    <Router>
      <div className='App'>
        {window.location.pathname === '/login' ? null : (
          <Navbar className='navbar' />
        )}

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/redirect' component={RedirectPage} />
          <Route path='/playlists' component={PlaylistsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
