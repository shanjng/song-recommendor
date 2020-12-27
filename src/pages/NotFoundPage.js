import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => { // kinda bullshit rn
  return (
    <React.Fragment>
      Page not found. Goto <Link to="/">Home Page</Link>
    </React.Fragment>
  );
};

export default NotFoundPage;