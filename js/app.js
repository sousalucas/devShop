var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

// Load Mock Product Data into localStorage
//ProductData.init();

// Load Mock API Call
//CartAPI.getProductData();

// Render FluxCartApp Controller View
ReactDOM.render(
  <App />,
  document.getElementById('dev-shop')
);
