var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

// Method to retrieve state from Stores
function getOrderState() {
  return {
    orderId: AppStore.getOrderID()
  };
}

// Define main Controller View
var Order = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    return getOrderState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var self = this;
    return (
      <div className="dev-order">
        <div className="container">
          <h1>Compra Finalizada!</h1>
          <h2>Número: {this.state.orderId}</h2>
        </div>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getOrderState());
  }

});

module.exports = Order;
