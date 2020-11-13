import {DvaLoadingState} from 'dva-loading-ts';

import home from './home';
import user from './user';
import productCategory from './productCategory';
const models = [home, user, productCategory];

export type RootState = {
  home: typeof home.state;
  user: typeof user.state;
  productCategory: typeof productCategory.state;
  loading: DvaLoadingState;
};

export default models;
