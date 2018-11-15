const ROUTES = {
  index: '/',
  login: '/login',
  register: '/register',
  articles: {
    createOrRead: '/articles/:slug',
    createNew: '/articles/new',
    update: '/articles/edit/:slug',
    activate: '/activate-account',
  },
  me: {
    articles: '/me/articles',
  },
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profiles: {
    view: '/profiles/view/:username',
    update: '/profiles/edit/:username',
  },
};

export default ROUTES;
