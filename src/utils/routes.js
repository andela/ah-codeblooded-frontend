const ROUTES = {
  index: '/',
  auth: {
    login: '/login',
    register: '/register',
  },
  articles: {
    read: '/article/:authorName/:slug',
    create: '/articles/:slug',
    createNew: '/articles/new',
    update: '/articles/edit/:slug',
  },
  activate: '/activate-account',
  me: {
    articles: '/me/articles',
  },
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profiles: {
    view: '/profiles/view/:username',
    update: '/profiles/edit/:username',
  },
  settings: '/settings',
};

export default ROUTES;
