var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Api = require('../utils/Api');

// Define actions object
var AppActions = {

  getDeveloper: function(devId) {
    AppDispatcher.handleAction({
      actionType: AppConstants.GET_DEV,
      devId: devId
    })
  },

  addDevToCart: function(dev) {
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_DEV,
      dev: dev
    })
  },

  removeDevFromCart: function(index) {
    AppDispatcher.handleAction({
      actionType: AppConstants.REMOVE_DEV,
      index: index
    })
  },

  getDevsList: function() {
    Api.getDevelopers();
  },

  getFollowers: function(userName) {
    Api.getFollowers(userName);
  }

};

module.exports = AppActions;
