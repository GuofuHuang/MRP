import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {goBack, navigate} from '@/utils/index';
import storage, {load} from '@/config/storage';
import {Alert} from "react-native";

const PRODUCT_URL = '/product';


export interface IProduct {
  _id: string;
  categoryId: string;
  name: string;
  image?: string;
  operations: [any];
}

export interface ProductModelState {
  products?: IProduct[];
}

export interface ProductModel extends Model {
  namespace: 'product';
  state: ProductModelState;
  effects: {
    loadProducts: Effect;
    add: Effect;
  };
  reducers: {
    setState: Reducer<ProductModelState>;
  };
}

const initialState = {
  products: [],
};

const productModel: ProductModel = {
  namespace: 'product',
  state: initialState,
  effects: {
    *loadProducts({payload}, {call, put}) {
      let query = {};
      const {status, msg, data} = yield call(axios.post, PRODUCT_URL + '/load_products', query);
      console.log('statu', status,  msg, data);
      navigate('Product');
    },
    *add({payload}, {call, put}) {

    }
  },
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
}

export default productModel;
