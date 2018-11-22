import {
  FacebookShareButton, FacebookIcon,
  EmailShareButton, EmailIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
} from 'react-share';
import React, { Component } from "react";
import './ArticleShare.scss';
import PropTypes from "prop-types";

const AUTHORS_HAVEN = "Authors' Haven";

const AH_HASH_TAG = 'AuthorsHaven';

const BRAND = {
  FACEBOOK: '4267b2',
  TWITTER: '1da1f2',
  WHATSAPP: '4AC959',
  EMAIL: '000000',
};


class ArticleShare extends Component {
  renderShare = (ShareButton, ShareIcon, iconColor, props) => (<>
    <ShareButton
      className="share-button"
      {...props}
    >
      <ShareIcon size={36} round iconBgStyle={{ fill: "#fff" }} logoFillColor={`#${iconColor}`} />
    </ShareButton>
    </>);

  render() {
    const { url, title } = this.props.article;
    return (
      <>
        &nbsp;&nbsp;
        {this.renderShare(
          FacebookShareButton,
          FacebookIcon,
          BRAND.FACEBOOK,
          { url, quote: title, hashtag: `#${AH_HASH_TAG}` },
        )}
        &nbsp;&nbsp;
        {this.renderShare(
          TwitterShareButton,
          TwitterIcon,
          BRAND.TWITTER,
          { url, title, hashtags: [AH_HASH_TAG] },
        )}
        &nbsp;&nbsp;
        {this.renderShare(
          WhatsappShareButton,
          WhatsappIcon,
          BRAND.WHATSAPP,
          { url, title },
        )}
        &nbsp;&nbsp;
        {this.renderShare(
          EmailShareButton,
          EmailIcon,
          BRAND.EMAIL,
          { url, subject: `${AUTHORS_HAVEN} : ${title}` },
        )}
        &nbsp;&nbsp;
      </>
    );
  }
}

ArticleShare.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleShare;
