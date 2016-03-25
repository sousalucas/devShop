var React = require('react');
var ReactDOM = require('react-dom');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Cart = require('../components/Cart');
var Order = require('../components/Order');

// Method to retrieve state from Stores
function getState() {
  return {
    devs: AppStore.getDevs(),
//     devs: [{
//               "login": "mojombo",
//               "avatar_url": "https://avatars.githubusercontent.com/u/1?v=3"
//   },{
//             "login": "rrerarae",
//             "avatar_url": "https://avatars.githubusercontent.com/u/1?v=3"
// }],
    cart: AppStore.getCart()
  };
}

// Define main Controller View
var App = React.createClass({

  getDevelopersList: function() {
    AppActions.getDevsList();
  },

  addDevToCart: function(dev) {
    //this.getFollowers(dev.login);
    AppActions.addDevToCart(dev);
  },

  devsOrder: function() {
    ReactDOM.render(<Order/>, document.getElementById('dev-shop'));
  },

  getFollowers: function(userName) {
    AppActions.getFollowers(userName);
  },

  // Get initial state from stores
  getInitialState: function() {
    this.getDevelopersList();
    return getState();
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
      <div className="dev-shop-app">
        <div className="container">
          <h1>DEVELOPERS SHOP</h1>
            {this.state.devs.map(function(dev, index){
              return (
                <div key={index}>
                  <div className="col-md-4">
                      <div key={index} className="dev-info">
                        <div className="dev-image">
                          <img style={{width: '100px',height: '100px'}} src={dev.avatar_url}/>
                        </div>
                        <div className="dev-login">
                          <label>{dev.login}</label>
                        </div>
                        <button className="btn btn-success" type="button" onClick={self.addDevToCart.bind(self, dev)}>Adicionar ao Carrinho</button>
                      </div>
                  </div>
                </div>
              )
            })}
          <Cart data={this.state.cart} />
          <button className="btn btn-primary" type="button" onClick={this.devsOrder}>Finalizar Compra</button>
        </div>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = App;
