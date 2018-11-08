// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import propTypes from 'prop-types';

// import { likeArticle } from './state/Actions';

// // eslint-disable-next-line react/prefer-stateless-function
// class LikeDislike extends Component {
//   state = {
//     count: null,
//     islike: false,
//     isdislike: false,
//   }

//   render() {
//     return (
//       <div className="col l8 s12 row valign-wrapper">
//         <button type="button" onClick={this.handleDislike} className="valign-wrapper teal-text">
//           <i className="material-icons">thumb_up</i>
//         </button>
//         <button type="button" onClick={this.handleDislike} className="valign-wrapper grey-text">
//           <i className="material-icons">thumb_down</i>
//         </button>
//       </div>
//     );
//   }
// }


// LikeDislike.propTypes = {
//   like: propTypes.shape({}),
//   likeArticle: propTypes.func.isRequired,

// };

// const mapStateToProps = state => ({
//   like: state.likeDislike.like,
// });

// export default connect(mapStateToProps, { likeArticle })(LikeDislike);
