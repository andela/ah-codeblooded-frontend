import React, { Component } from 'react';
import Dante from 'Dante2';
import { ImageBlockConfig } from 'Dante2/package/es/components/blocks/image';
import './ArticleEditor.scss';
import { VideoBlockConfig } from 'Dante2/package/es/components/blocks/video';
import { CodeBlockConfig } from 'Dante2/package/es/components/blocks/code';
import { EmbedBlockConfig } from 'Dante2/package/es/components/blocks/embed';
import { PlaceholderBlockConfig } from 'Dante2/package/es/components/blocks/placeholder';
import PropTypes from 'prop-types';
import Materialize from 'materialize-css';
import upload from '../../utils/upload';
import config from '../../utils/config';
import ArticleViewLoader from '../ArticleViewLoader';
import PublishDropDown from '../PublishDropDown';

class ArticleEditor extends Component {
  state = {
    article: {
      title: '', body: '', description: '', slug: '', tags: [], published: false,
    },
    errors: [],
    chosenImage: '',
  };

  renderErrors = errors => (
    <div className="red-text">
      <ul>
        { errors.map(error => (
          <li>{ error }</li>
        ))}
      </ul>
    </div>
  );

  publishArticle = () => {
    const { article } = this.state;
    const { readOnly } = this.props;
    if (!readOnly) {
      this.createArticle();
      const { saveArticle, history } = this.props;
      this.setState({ article: Object.assign(article, { published: true }) });
      if (!article.image && this.getImages().length > 0) {
        this.setState({ article: Object.assign(article, { image: this.getImages()[0] }) });
      }
      saveArticle({ ...article, published: true }, () => {
        history.push(`/articles/${article.slug}`);
      });
    }
  };


  onTagsChanged = (tags) => {
    const { saveArticle, readOnly } = this.props;
    const { article } = this.state;

    this.createArticle();
    this.setState({ article: { ...article, tags } });

    if (!readOnly) { saveArticle({ tags, slug: article.slug }); }
  };

  saveDraft = () => {
    const { history, readOnly } = this.props;
    if (!readOnly) {
      history.push('/');
      Materialize.toast({ html: 'Article saved as draft!' });
    }
  };

  handleUpload = (file, state) => {
    upload({
      body: file,
      progress: (e) => {
        state.updateProgressBar(e);
      },
    })
      .then((data) => {
        state.uploadCompleted(data.secure_url);
      });
  };

  onImageChange = (image) => {
    this.setState({ chosenImage: image });
    const { article } = this.state;
    this.setState({ article: { ...article, image } });
  }

  componentWillReceiveProps = (nextProps) => {
    const { article } = this.state;
    const newArticle = nextProps.article;
    const { history, readOnly, update } = this.props;

    if (readOnly) {
      this.setState({ article: newArticle });
    } else {
      if (article.slug !== newArticle.slug && newArticle.slug) {
        history.push(`/articles/${update ? 'edit/' : ''}${newArticle.slug}`);
      }
      this.setState({
        article: Object.assign(article,
          { slug: newArticle.slug, tags: newArticle.tags, published: newArticle.published }),
        chosenImage: newArticle.image,
      });
    }
  };

  getImages = () => {
    const images = [];
    if (this.editor) {
      const { blocks } = this.getEditorContent();

      for (let i = 0; i < blocks.length; i += 1) {
        let image = null;
        if (blocks[i].type === 'image') {
          const { data: { url } } = blocks[i];
          image = url;
        } else if (blocks[i].type === 'video') {
          const { thumbnail_url: thumbNail } = JSON.parse(
            JSON.stringify(blocks[i].data.embed_data),
          );
          image = thumbNail;
        }

        if (image) {
          images.push(image);
        }
      }
    }
    return images;
  };

  getEditorContent = () => this.editor.editor.emitSerializedOutput();

  createArticle = () => {
    const state = this.editor;
    if (state != null) {
      const editorState = this.getEditorContent();

      const { article, chosenImage } = this.state;
      const firstBlock = editorState.blocks[0].text;

      if (chosenImage) {
        this.setState({ article: { ...article, image: chosenImage } });
      }
      this.setState({
        article: Object.assign(article, {
          title: firstBlock.substring(0, 128),
          description: (editorState.blocks.length > 1
            ? editorState.blocks[1].text
            : firstBlock).substring(0, 128),
          body: JSON.stringify(editorState),
        }),
      });
    }
  };

  handleSave = (state) => {
    this.editor = state;

    const { readOnly, match: { params: { slug } }, isPageLoading } = this.props;
    const { article } = this.state;
    if (!readOnly && !isPageLoading) {
      this.createArticle();
      const { blocks } = this.getEditorContent();
      if (!(blocks.length === 1 && blocks[0].text === '')) {
        const { saveArticle } = this.props;
        saveArticle({
          ...article,
          published: false,
          slug: article.slug || (slug && slug !== 'new'),
        });
      }
    }
  };


  renderEditor = () => {
    const {
      editorState, isFetching,
      readOnly,
    } = this.props;

    return (
      isFetching ? <ArticleViewLoader /> : (
        <div>
          <Dante
            data_storage={{
              interval: 500,
              url: config.BASE_URL,
              method: 'POST',
              save_handler: this.handleSave,
            }}
            read_only={readOnly}
            content={editorState}
            spellcheck
            widgets={[
              ImageBlockConfig({
                options: {
                  upload_url: config.BASE_URL,
                  upload_callback: this.handleUpload,
                  upload_handler: this.handleUpload,
                },
              }),
              VideoBlockConfig(),
              CodeBlockConfig(),
              EmbedBlockConfig(),
              PlaceholderBlockConfig(),
            ]}
          />
        </div>
      )
    );
  };

  render() {
    const { errors, article, chosenImage } = this.state;
    return (
      <div className="article-editor">
        <div>
          { this.renderEditor()}
        </div>
        <PublishDropDown
          tags={article.tags}
          onTagChanged={this.onTagsChanged}
          draftHandler={this.saveDraft}
          publishHandler={this.publishArticle}
          images={this.getImages()}
          imageChooseCallback={this.onImageChange}
          currentImage={chosenImage}
        />
        { errors.length > 0 ? (this.renderErrors(errors)) : null}
      </div>
    );
  }
}

ArticleEditor.defaultProps = {
  readOnly: false,
  update: false,
};

ArticleEditor.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  article: PropTypes.shape({}).isRequired,
  readOnly: PropTypes.bool,
  saveArticle: PropTypes.func.isRequired,
  update: PropTypes.bool,
  isPageLoading: PropTypes.bool.isRequired,
  editorState: PropTypes.shape({}).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
export default ArticleEditor;
