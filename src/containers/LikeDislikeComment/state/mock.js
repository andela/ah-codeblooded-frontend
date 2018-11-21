export const message = "Something went wrong. Try again";
export const payload = {
  likes: {
    count: 0,
    me: false,
  },
};
export const state = {
  error: "",
  reactions: {
    likes: {
      count: 0,
      me: false,
    },
    dislikes: {
      count: 0,
      me: false,
    },
  },
};
export const action = {};
export const reactions = {
  reactions: {
    likes: {
      count: 8,
      me: true,
    },
    dislikes: {
      count: 10,
      me: false,
    },
  },
};
export const slug = 'this-is-an-articles-title-plg70mtk521b';
export const id = 1;
export const data = {
  data: {
    reactions: {
      likes: {
        count: 6,
        me: true,
      },
      dislikes: {
        count: 3,
        me: false,
      },
    },
  },
};

export const commentData = {
  data: {
    comment: {
      comment: {
        ...reactions.reactions,
      },
    },
  },
};
