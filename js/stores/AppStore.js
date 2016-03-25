var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

// Define initial data points
var _developers = [];
var _cart = [];
var _followers = 0;

function loadDevs(data) {
  _developers = data;
}

function addDevToCart(data) {
  data.price = _followers > 0 ? _followers * 3.0 : 10.0;
  _cart.push(data);
}

function removeDevFromCart(index) {
  _cart.splice(index, 1);
}

function setFollowers(count) {
  console.log(count);
  _followers = count;
}

// Extend AppStore with EventEmitter to add eventing capabilities
var AppStore = _.extend({}, EventEmitter.prototype, {

  getDevs: function() {
    return _developers;
  },

  getCart: function() {
    return _cart;
  },

  getOrderID: function() {
    return Math.floor(Math.random() * (100000 - 10000 + 1) + 10000);
  },

  getFollowers: function() {
    return _followers;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case AppConstants.GET_DEV:
      setSelected(action.data);
      break;

    case AppConstants.GET_DEV_LIST:
      loadDevs(action.response.body);
      break;

    case AppConstants.ADD_DEV:
      addDevToCart(action.dev);
      break;

    case AppConstants.REMOVE_DEV:
      removeDevFromCart(action.index);
      break;

    case AppConstants.GET_DEV_FOLLOWERS:
      setFollowers(action.response.body.count);
      break;

    default:
      return true;
  }

  AppStore.emitChange();

  return true;

});

module.exports = AppStore;
