
import { createStore } from 'redux';


// 1. Click counter
// 2. Photo favourites/bookmarks list

const initialState = {
  counter: 0,
  favouritePhotos: [],
  // more key-val pairs
};

// let num = 5;
// // idempotency 
// // referential transparency

// const result = a + b + x;

// function add( a, b ){
//   num += 1; // side effect
//   const x = 3;
//   return a + b + x;
// }


// 'Grokking Simplicity':
// Calculations (pure function)
// Actions (side effects, change global state)


// A reducer is a "pure function" - a function which is completely deterministic/
// predictable because given specific inputs, it ALWAYS returns the same outputs;
// it has no "side-effects" - it doesn't change global variables, it doesn't
// save to the database or make a network request
//
// It takes the current state object, an action to perform on that state,
// (and optionally an action payload - some extra data to use),
// and it returns the *entire* new state object as updated by the action
function reducer( state=initialState, action ){

  // We use a switch statement (instead of an if-else-if chain)
  // to test the action type and conditionally run the matching code
  switch( action.type ){

    case 'clickCounter/incremented':

      // NOTE: treat Redux state as immutable! Make copies of the data and add/delet
      // on the copy, instead of changing the original state. i.e., same as with
      // a React component's state

      return {
        ...state, // use the spread operator to copy the key-value pairs from the existing state
        counter: state.counter + 1
      };

    case 'clickCounter/decremented':
      return {
        ...state,
        counter: state.counter - 1
      };

    case 'clickCounter/incrementedBy':
      return {
        ...state, 
        counter: state.counter + action.payload
      }


    case 'favouritePhotos/added':
      return {
        ...state,
        favouritePhotos: [ ...state.favouritePhotos, action.payload ]
      };


    // If no action above matches, return the current state unchanged
    default:
      console.log('UNMATCHED ACTION:', action);
      return state;

  } // switch on action.type

} // reducer()


// Single named export, inlined with the variable declaration
// To import:
//    import { store } from '../redux/store';

export const store = createStore(
  reducer,
  // optional second argument: initial state value to use, maybe from localStorage.getItem() ?
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);



store.subscribe( (anything) => {

  const state = store.getState();
  // save to localStorage, send to backend to save to DB
  console.log('Redux store change', state, anything);

});

