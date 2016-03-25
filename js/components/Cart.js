var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

// Method to retrieve state from Stores
function getCartState() {
  return {
    cart: AppStore.getCart()
  };
}

// Define main Controller View
var Cart = React.createClass({

  removeDevFromCart: function(index) {
    AppActions.removeDevFromCart(index);
  },

  // Get initial state from stores
  getInitialState: function() {
    return getCartState();
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
      <div className="dev-cart">
        <h3>Carrinho</h3>
        <table className="table-cart">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.state.cart.map(function(itemDev, index){
            return (
              <tr key={index} className="dev-cart-item">
                <td>{itemDev.login}</td>
                <td>{itemDev.price}</td>
                <td><button className="btn btn-danger" type="button" onClick={self.removeDevFromCart.bind(self, index)}>Remover</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getCartState());
  }

});

module.exports = Cart;
