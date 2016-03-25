var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var request = require('superagent');

//var API_URL = 'http://localhost:3000/api';
var API_URL = 'https://devshopapi.herokuapp.com/api';
var TIMEOUT = 10000;
var _pendingRequests = {};

function abortPendingRequests(key) {
    if (_pendingRequests[key]) {
        _pendingRequests[key]._callback = function(){};
        _pendingRequests[key].abort();
        _pendingRequests[key] = null;
    }
}

// function token() {
//     return UserStore.getState().token;
// }

function makeUrl(part) {
    return API_URL + part;
}

function dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    //AppDispatcher.handleRequestAction(payload);
    AppDispatcher.handleAction(payload);
}

// return successful response, else return request Constants
function makeDigestFun(key, params) {
    return function (err, res) {
        if (err && err.timeout === TIMEOUT) {
            dispatch(key, AppConstants.request.TIMEOUT, params);
        } else if (res.status === 400) {
            //UserActions.logout();
        } else if (!res.ok) {
            dispatch(key, AppConstants.request.ERROR, params);
        } else {
            dispatch(key, res, params);
        }
    };
}

// a get request with an authtoken param
function get(url) {
    return request
        .get(url)
        .timeout(TIMEOUT);
        //.query({authtoken: token()});
}

var Api = {
    getDevelopers: function() {
        var url = makeUrl("/devs");
        var key = AppConstants.GET_DEV_LIST;
        var params = {};
        abortPendingRequests(key);
        //dispatch(key, AppConstants.request.PENDING, params);
        _pendingRequests[key] = get(url).end(
            makeDigestFun(key, params)
        );
    },

    getFollowers: function(userName) {
        var url = makeUrl("/followers/" + userName);
        var key = AppConstants.GET_DEV_FOLLOWERS;
        var params = {userName: userName};
        abortPendingRequests(key);
        //dispatch(key, AppConstants.request.PENDING, params);
        _pendingRequests[key] = get(url).end(
            makeDigestFun(key, params)
        );
    }
};

module.exports = Api;
