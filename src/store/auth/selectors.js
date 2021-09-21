export function selectActiveUser(state) {
  console.log(state.auth.activeUser);
  return state.auth.activeUser;
}

export function selectIsAuthenticated(state) {
  return !!state.auth.token;
}
