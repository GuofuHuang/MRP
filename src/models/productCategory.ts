import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import storage, {load} from '@/config/storage';
import {RootState} from "@/models/index";
import {goBack, navigate, navigationRef, push} from "@/utils/index";
import {Alert} from "react-native";

const PRODUCTCATEGORY_URL = '/product_category';

export interface IProductCategory {
  _id: string;
  name: string;
  level: number;
  parentCategoryId: string;
}

export interface ProductCategoryModelState {
  productCategories: IProductCategory[];
}

export interface ProductCategoryModel extends Model {
  namespace: 'productCategory';
  state: ProductCategoryModelState;
  effects: {
    getAll: Effect;
    add: Effect;
    loadCategories: Effect;
    update: Effect;
  };
  reducers: {
    setState: Reducer<ProductCategoryModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const initalState = {
  productCategories: [],
};

const productCategoryModel: ProductCategoryModel = {
  namespace: 'productCategory',
  state: initalState,
  effects: {
    *update({payload}, {call}) {
      console.log('console', payload);
      const {status, msg} = yield call(axios.post, PRODUCTCATEGORY_URL + '/update', payload);

      console.log('sate', status, msg);
      if (status === 200) {
        goBack();

        const route: any = navigationRef.current?.getCurrentRoute();
        let index = route.params.productCategories.findIndex(item => item._id === payload._id);
        Object.assign(route.params.productCategories[index], payload.update);
        navigationRef.current?.setParams({productCategories: route.params.productCategories});

      } else {
        Alert.alert('Error', msg);
      }


    },
    *loadCategories({payload}, {call, put}) {
      console.log('payload', payload);
      const {status, msg, data} = yield call(axios.post, PRODUCTCATEGORY_URL + '/load_categories', payload);

      console.log('states', status, payload.level);
      if (status === 200) {
        // yield put({
        //   type: 'setState',
        //   payload: {
        //     productCategories: data,
        //   },
        // });
        const params = {
          level: payload.level,
          parentCategoryId: payload.parentCategoryId,
          productCategories: data,
          title: payload.title
        }
        console.log('push', payload.component, params)
        push(payload.component, params);
      }
    },
    *getAll(_, {call, put}) {
      const productCategories = yield call(load, {key: 'productCategories'});
      console.log('get all', productCategories);
      if (productCategories) {
        yield put({
          type: 'setState',
          payload: {
            productCategories: productCategories,
          },
        });
      } else {
        console.log('message', 'yes');
      }
    },
    *add({payload}, {call, put, select}) {
      const {data, status, msg} = yield call(axios.post, PRODUCTCATEGORY_URL + '/add', payload);
      // const {productCategories} = yield select(({productCategory}: RootState) => productCategory);

      const newResult = [data];

      console.log('payloadpayloadpayloadpayload', newResult);

      if (status === 200) {
        yield put({
          type: 'setState',
          payload: {
            productCategories: newResult,
          },
        });
        const params = {
          level: payload.level,
          parentCategoryId: payload.parentCategoryId,
          productCategories: data
        }

        goBack();
        const route: any = navigationRef.current?.getCurrentRoute();
        navigationRef.current?.setParams({productCategories: [...route?.params?.productCategories, ...newResult]});
      } else if (status === 400){
        Alert.alert(msg);
      }
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
  subscriptions: {
    // setup({dispatch}) {
    //   dispatch({type: 'getAll'});
    // },
    asyncStorage() {
      // storage.sync.productCategories = async () => {
      //   const dddd = await axios.get(PRODUCTCATEGORY_URL + '/load_all');
      //   console.log('get all data', dddd);
      //   return dddd;
      // };

      // axios.get('/product_category/load_all')
      //   .then(function (response) {
      //     // handle success
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log('network error1212', error.message);
      //   })
      //   .then(function () {
      //     // always executed
      //   });

    },
  },
};

export default productCategoryModel;
