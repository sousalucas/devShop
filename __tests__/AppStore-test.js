jest.dontMock('../js/stores/AppStore');
jest.dontMock('keymirror');
jest.dontMock('underscore');

describe('AppStore', function() {

  var AppConstants = require('../js/constants/AppConstants');

  var actionAppGetDevsList = {
    source: 'VIEW_ACTION',
    action: {
      actionType: AppConstants.GET_DEV_LIST,
      response: {
        body: {
          developers: [{name: 'test', age: 20}, {name: 'test2', age: 28}]
        }
      }
    }
  };

  var AppDispatcher;
  var AppStore;
  var callback;

  beforeEach(function() {
    AppDispatcher = require('../js/dispatcher/AppDispatcher');
    AppStore = require('../js/stores/AppStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('get initialized  empty devs list', function() {
    var all = AppStore.getDevs();
    expect(all).toEqual([]);
  });

  it('get loaded devs list', function() {
    callback(actionAppGetDevsList);
    var all = AppStore.getDevs();
    expect(all.length).toBe(2);
    //expect(all).toEqual([{name: 'test', age: 20}]);
  });

  // it('destroys a to-do item', function() {
  //   callback(actionTodoCreate);
  //   var all = TodoStore.getAll();
  //   var keys = Object.keys(all);
  //   expect(keys.length).toBe(1);
  //   actionTodoDestroy.action.id = keys[0];
  //   callback(actionTodoDestroy);
  //   expect(all[keys[0]]).toBeUndefined();
  // });

});
