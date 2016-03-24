var keyMirror = require('keymirror');

// Define action constants
module.exports = keyMirror({
  ADD_DEV: null,
  REMOVE_DEV: null,
  GET_DEV: null,
  GET_DEV_LIST: null,
    request: {
      PENDING:  null,
      TIMEOUT:  null,
      ERROR:    null
    }
});
