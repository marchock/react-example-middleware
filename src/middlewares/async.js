export default function({ dispatch }) {

  // return function (next) {
  //   return function (action) {

  //   }
  // }

  // this is the same as above
  return next => action => {

    // of action does not have payload or, the payload does not have a .then
    // property we dont care about it , send it on
    if (!action.payload || !action.payload.then) {

      // next passes on to the next middleware
      return next(action);
    }

    console.log('we have a promise', action);

    // make sure the actions promise resolves

    action.payload.then(function(response) {
      // create a new action with the old type, but
      // replace the promise with the response data
      const newAction = { ...action, payload: response.data };

      // do not want to send it to the next middleware
      // use dispatch to send it back to the top of the reducers
      // like it is a new action
      dispatch(newAction);
    });

    // next is to pass it to the next middleware

    // dispatch sends a new action from the beggining


  }
}

/// example to use middleware

// api data structure does not match front end
// add logic to middleware to restructure data for better maintenace 
