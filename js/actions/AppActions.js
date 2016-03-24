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

  addDeveloper: function(dev) {
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_DEV,
      dev: dev
    })
  },

  removeDeveloper: function(dev) {
    AppDispatcher.handleAction({
      actionType: AppConstants.REMOVE_DEV,
      dev: dev
    })
  },

  getDevsList: function() {
    Api.getDevelopers();
  }

};

module.exports = AppActions;
