import React from 'react';
import {render} from 'react-dom';
import Component from './Component.jsx';

class App extends React.Component {
  render () {
  return (
      <div>
        <p> Hello React!</p>
        <Component />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
