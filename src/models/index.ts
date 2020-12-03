import {DvaLoadingState} from 'dva-loading-ts';

import home from './home';
import user from './user';
import productCategory from './productCategory';
import product from './product';
const models = [home, user, productCategory, product];

export type RootState = {
  home: typeof home.state;
  user: typeof user.state;
  productCategory: typeof productCategory.state;
  product: typeof product.state;
  loading: DvaLoadingState;
};

export default models;
