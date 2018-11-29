import React from 'react';
import { ErrorPage } from '../ErrorPage';

const PageNotFound = () => (
  <div>
    <ErrorPage errorCode={404} errorMessage="Page not found" />
  </div>
);

export default PageNotFound;
