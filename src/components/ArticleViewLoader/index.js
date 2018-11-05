import React from 'react';
import ContentLoader from 'react-content-loader';

export default props => (
  <ContentLoader
    rtl
    height={500}
    width={500}
    speed={3}
    primaryColor="#cccccc"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="2" rx="5" ry="5" width="496" height="180" />
    <rect x="8.03" y="209.61" rx="0" ry="0" width="285.36" height="33.35" />
    <rect x="198.03" y="194.61" rx="0" ry="0" width="0" height="0" />
    <rect x="7.03" y="259.61" rx="0" ry="0" width="482" height="3" />
    <rect x="176.03" y="208.61" rx="0" ry="0" width="0" height="0" />
    <rect x="179.03" y="209.61" rx="0" ry="0" width="0" height="10" />
    <rect x="5.03" y="279.61" rx="0" ry="0" width="482" height="3" />
    <rect x="6.03" y="299.61" rx="0" ry="0" width="482" height="3" />
    <rect x="8.03" y="318.61" rx="0" ry="0" width="482" height="3" />
    <rect x="9.03" y="338.61" rx="0" ry="0" width="482" height="3" />
    <rect x="6.03" y="399.61" rx="0" ry="0" width="482" height="3" />
    <rect x="8.03" y="419.61" rx="0" ry="0" width="482" height="3" />
    <rect x="8.03" y="438.61" rx="0" ry="0" width="482" height="3" />
    <rect x="9.03" y="458.61" rx="0" ry="0" width="482" height="3" />
    <rect x="8.03" y="359.61" rx="0" ry="0" width="289.2" height="3" />
    <rect x="9.03" y="479.61" rx="0" ry="0" width="289.2" height="3" />
  </ContentLoader>
);
