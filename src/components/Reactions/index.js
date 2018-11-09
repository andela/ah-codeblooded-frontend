import React from 'react';
import PropTypes from 'prop-types';

const Reactions = (props) => {
  const { likes, dislikes, handleClick } = props;
  return (
    <div>
      <label htmlFor="likes">{ likes }</label>
      <button id="likes" value="likes" type="button" onClick={handleClick} />
      <label htmlFor="dislikes">{ dislikes }</label>
      <button id="dislikes" value="dislikes" type="button" onClick={handleClick} />
    </div>
  );
};

// eslint-disable-next-line react/no-typos
Reactions.PropTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};


export default Reactions;
