/* */

// Getters

export default{
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  answer: state => state.answer,
};
