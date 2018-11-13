import ContentLoader from "react-content-loader";
import React from 'react';
import layouts, { sizes } from './layouts';

const ArticleCardLoader = ({ layout, ...props }) => (
  <ContentLoader
    rtl
    height={sizes[layout]}
    width={700}
    speed={3}
    primaryColor="#cccccc"
    secondaryColor="#ecebeb"
    {...props}
  >
    {layouts[layout]}
  </ContentLoader>
);

export default ArticleCardLoader;
