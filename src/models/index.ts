import {DvaLoadingState} from 'dva-loading-ts';

import home from './home';
import user from './user';
const models = [home, user];

export type RootState = {
  home: typeof home.state;
  user: typeof user.state;
  loading: DvaLoadingState;
};

export default models;
