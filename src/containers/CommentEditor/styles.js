
export default {
  control: {
    backgroundColor: '#fff',
    fontWeight: 'normal',
    margin: '1em',
  },

  highlighter: {
    overflow: 'hidden',
  },

  input: {
    margin: 0,
  },

  '&multiLine': {
    control: {
    },

    highlighter: {
      padding: 0,
    },

    input: {
      minHeight: '50',
      outline: 0,
      border: 0,
      overflow: 'auto',
      transition: 'height 500ms',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
    },

    item: {
      padding: '5px 15px',

      '&focused': {
        backgroundColor: 'rgba(0,0,0,.15)',
      },
    },
  },
};

export const mentionStyle = {
  backgroundColor: 'rgba(0,0,0,.15)',
};
