import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Routes from './Routes';

export const App = (): React.ReactElement => (
  <BrowserRouter>
    <div className="level">
      <div className="level-left">
        <Link to="/">
          <h1 className="title is-size-6">
            Cryptocurrency Dashboard
          </h1>
        </Link>
      </div>
    </div>

    <div className="container is-fluid">
      <Routes />
    </div>
  </BrowserRouter>
);

export default App;
