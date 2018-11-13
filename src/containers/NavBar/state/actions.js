import { PAGE_LOADED, PAGE_LOADING } from './types';

export const pageLoadingAction = () => ({ type: PAGE_LOADING });

export const pageLoadedAction = () => ({ type: PAGE_LOADED });
