const ROUTES = {
  index: '/',
  login: '/login',
  register: '/register',
  articles: {
    createOrRead: '/articles/:slug',
    createNew: '/articles/new',
    update: '/articles/edit/:slug',
  },
  me: {
    articles: '/me/articles',
  },
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
};
export default ROUTES;
