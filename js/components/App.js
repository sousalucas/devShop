var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
//var FluxCart = require('./FluxCart.react');

// Method to retrieve state from Stores
function getCartState() {
  return {
    //devs: AppStore.getDevs(),
    devs: [{
"login": "mojombo",
"id": 1,
"avatar_url": "https://avatars.githubusercontent.com/u/1?v=3",
"gravatar_id": "",
"url": "https://api.github.com/users/mojombo",
"html_url": "https://github.com/mojombo",
"followers_url": "https://api.github.com/users/mojombo/followers",
"following_url": "https://api.github.com/users/mojombo/following{/other_user}",
"gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
"starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
"organizations_url": "https://api.github.com/users/mojombo/orgs",
"repos_url": "https://api.github.com/users/mojombo/repos",
"events_url": "https://api.github.com/users/mojombo/events{/privacy}",
"received_events_url": "https://api.github.com/users/mojombo/received_events",
"type": "User",
"site_admin": false
}],
    cart: [{login:'hahah', price: 777}]
  };
}

// Define main Controller View
var App = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    //this.getDevelopersList();
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

  getDevelopersList: function() {
    AppActions.getDevsList();
  },

  addDevToCart: function() {
    console.log("asdasda");
    //this.cart = [{login: 'hahha', price: 777}];
  },

  render: function() {
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
                          {dev.login}
                        </div>
                        <div className="dev-price">
                          {dev.price}
                        </div>
                        <button type="button" onClick={this.addDevToCart}>Adicionar ao Carrinho</button>
                      </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="dev-cart">
          <div className="container">
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
                    <td><button type="button" onClick={this.removeDevFromCart}>Remover</button></td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getCartState());
  }

});

module.exports = App;
