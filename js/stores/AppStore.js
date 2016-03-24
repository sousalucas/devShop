var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');

// Define initial data points
var _developers = [];

function loadDevs(data) {
  _developers = data;
}

// Extend AppStore with EventEmitter to add eventing capabilities
var AppStore = _.extend({}, EventEmitter.prototype, {

  // Return Devs data
  getDevs: function() {
    return _developers;
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
  var text;

  switch(action.actionType) {

    case AppConstants.GET_DEV:
      setSelected(action.data);
      break;

    case AppConstants.GET_DEV_LIST:
      loadDevs(action.response.body);
      break;

    default:
      return true;
  }

  AppStore.emitChange();

  return true;

});

module.exports = AppStore;
