export const getCurrentUser = () => {
  // read the user details from local storage
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const getToken = () => (getCurrentUser() ? getCurrentUser().token : null);
