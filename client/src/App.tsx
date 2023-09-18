import React from 'react';

// Styling
import './App.css';

import LeftSide from './LeftSide';
import RightSide from './RightSide';

const apiHost = process.env.REACT_APP_API_HOST || 'http://localhost:3000/';
const credentials = process.env.REACT_APP_CREDENTIALS || 'mysecrettoken';
const localInterval = 1 * 1000;
const serverInterval = 30 * 1000;

function App() {
  return (
    <div className="App">
      <LeftSide
        apiHost={apiHost}
        credentials={credentials}
        localInterval={localInterval}
        serverInterval={serverInterval}
      />
      <RightSide
        apiHost={apiHost}
        credentials={credentials}
        serverInterval={serverInterval}
      />
    </div>
  );
}

export default App;
