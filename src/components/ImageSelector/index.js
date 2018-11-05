import React, { Component } from 'react';
import './ImageSelector.scss';
import PropTypes from 'prop-types';

class ImageSelector extends Component {
  state = {
    selected: '',
  };

  componentDidMount = () => {
    const { images, selected, onChange } = this.props;
    if (images.length > 0 && !selected) {
      this.setState({ selected: images[0] });
      onChange(images[0]);
    }
  };

  renderImage = (image) => {
    const { selected } = this.props;
    const { selected: fromState } = this.state;

    return (
      <button
        className="image"
        type="button"
        key={image}
        onClick={() => this.onImageClick(image)}
      >
        <img
          src={image}
          alt=""
          data-selected={selected === image || fromState === image}
        />
      </button>
    );
  };

  onImageClick = (image) => {
    this.setState({ selected: image });
    const { onChange } = this.props;
    onChange(image);
  };

  render() {
    const { images } = this.props;
    return (
      <div className="images">
        {images.map(image => this.renderImage(image))}
      </div>
    );
  }
}

ImageSelector.defaultProps = {
  selected: '',
};

ImageSelector.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
};


export default ImageSelector;
