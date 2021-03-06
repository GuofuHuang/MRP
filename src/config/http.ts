import axios from 'axios';
import {getSystemName} from 'react-native-device-info';


console.log('system name', getSystemName());
if (getSystemName() == "Android") {
  axios.defaults.baseURL = 'http://10.0.2.2:3000';
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:3000';
}

// axios.defaults.headers = {
//   icode: '6F1D72C83F450609',
// };

axios.interceptors.request.use(
  function (config) {
    config.headers = {
      icode: '6F1D72C83F450609',
    };
    // console.log('请求config', config);
    return config;
  },
  function (error) {
    return error;
  },
);

axios.interceptors.response.use(
  function (response) {
    // console.log('response', response);
    return response.data;
  },
  function (error) {
    // console.log('error2', JSON.stringify(error));
    return error;
  },
);
