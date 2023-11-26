// // store.js
// import { configureStore } from 'redux';

// const initialState = {
//   isLoggedIn: false,
//   token: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         isLoggedIn: true,
//         token: action.payload,
//       };
//     case 'LOGOUT':
//       return initialState;
//     default:
//       return state;
//   }
// };

// const store = configureStore (authReducer);

// export default store;
