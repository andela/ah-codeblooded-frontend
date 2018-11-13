import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Materialize from 'materialize-css';
import DropDown from '../DropDown';
import './PublishDropDown.scss';
import ImageSelector from '../ImageSelector';

class PublishDropDown extends Component {
  generateTagList = (tags) => {
    const data = [];
    tags.forEach((tag) => {
      data.push({ tag });
    });
    return data;
  };

  componentDidMount = () => {
    this.initTags();
  };

  initTags = () => {
    const { onTagChanged, tags } = this.props;
    const data = this.generateTagList(tags);

    this.tagsInput = Materialize.Chips.init(document.querySelector('#tags'), {
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
      data,
      onChipAdd: () => {
        onTagChanged(this.getTagList());
      },
      onChipDelete: () => {
        onTagChanged(this.getTagList());
      },
    });
  };

  getTagList = () => {
    const tags = [];
    this.tagsInput.chipsData.forEach((chip) => {
      tags.push(chip.tag);
    });
    return tags;
  };

  componentWillReceiveProps = () => {
    const input = document.querySelector('#publish-article #tags input');
    if (document.activeElement !== input) {
      this.initTags();
    }
  };

  render() {
    const {
      publishHandler, draftHandler, images, currentImage, imageChooseCallback,
    } = this.props;
    return (
      <DropDown
        id="publish-article"
        options={{ closeOnClick: false }}
        closeTrigger="dropdown-close"
      >
        <div className="publish-dropdown">
          <h5>Ready to publish?</h5>
          <p>Add tags to make it easier for readers to find your article</p>
          <div className="chips chips-placeholder" id="tags" />
          {
            images.length > 1 ? (
              <>
                <p>
                    Choose a high-res image to help
                    your audience discover your article
                </p>
                <ImageSelector
                  images={images}
                  onChange={imageChooseCallback}
                  selected={currentImage}
                />
              </>
            ) : null
          }
          <div className="row">
            <button
              type="button"
              className="dropdown-close btn btn-flat white black-text left"
              onClick={draftHandler}
            >
            Save Draft
            </button>
            <button
              type="button"
              className="dropdown-close btn right"
              onClick={publishHandler}
            >
              Publish
            </button>
          </div>
        </div>
      </DropDown>
    );
  }
}

PublishDropDown.defaultProps = {
  tags: [],
  images: [],
  currentImage: '',
};

PublishDropDown.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  images: PropTypes.arrayOf(PropTypes.string),
  currentImage: PropTypes.string,
  imageChooseCallback: PropTypes.func.isRequired,
  publishHandler: PropTypes.func.isRequired,
  draftHandler: PropTypes.func.isRequired,
  onTagChanged: PropTypes.func.isRequired,
};

export default PublishDropDown;
