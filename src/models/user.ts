import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {goBack} from '@/utils/index';
import storage, {load} from '@/config/storage';
import {Alert} from "react-native";

const USER_URL = '/auth/login';

export interface IUser {
  name: string;
  avatar: string;
}

export interface UserModelState {
  user?: IUser;
}

export interface UserModel extends Model {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
    loadStorage: Effect;
  };
  reducers: {
    setState: Reducer<UserModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const initalState = {
  user: undefined,
};

const userModel: UserModel = {
  namespace: 'user',
  state: initalState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *login({payload}, {call, put}) {
      const {data, status, msg} = yield call(axios.post, USER_URL, payload);
      // console.log('data', data, status, msg, payload, USER_URL);
      if (status === 200) {
        yield put({
          type: 'setState',
          payload: {
            user: data,
          },
        });
        storage.save({
          key: 'user',
          data,
        });
        goBack();
      } else {
        Alert.alert('Error', msg);
      }
    },
    *logout(_, {put}) {
      yield put({
        type: 'setState',
        payload: {
          user: undefined,
        },
      });
      storage.save({
        key: 'user',
        data: null,
      });
    },
    *loadStorage(_, {put, call}) {
      try {
        const user = yield call(load, {key: 'user'});
        yield put({
          type: 'setState',
          payload: {
            user,
          },
        });
      } catch (error) {
        console.log('保存用户信息错误', error);
      }
    },
  },
  subscriptions: {
    setup({dispatch}) {
      console.log('change');
      dispatch({
        type: 'loadStorage',
      });
    },
  },
};

export default userModel;
