import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import router from '@/router';
import store from '@/store';

axios.defaults.withCredentials = true;
axios.defaults.retryDelay = 1200000;
axios.defaults.timeout = 1200000;

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // url: `/hb-weber${config.url}`
    const $config = { ...config };
    const ContentType = $config.headers['Content-Type'];
    const { userToken } = store.state.user;

    if (config.method === 'get') {
      //  给data赋值以绕过if判断
      $config.data = $config.data || null;
    }

    if (!ContentType || !ContentType.match('form-data')) {
      $config.data = JSON.stringify(config.data);
      $config.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
        // 'Access-Control-Allow-Origin': '*',
      };
    }

    if (userToken) {
      $config.headers.token = userToken;
    }
    return $config;
  },
  (error) => Promise.reject(error)
);

let isLoginFailWarning = false;

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (
      (res.CODE === 401 || res.CODE === 1013 || res.code === 2002 || res.code === 2003) &&
      !isLoginFailWarning
    ) {
      // 登陆过期
      isLoginFailWarning = true;
      sessionStorage.clear();
      MessageBox.confirm('您的登录已过期，请重新登陆登陆', {
        confirmButtonText: '登录',
        showCancelButton: false,
        type: 'warning'
      })
        .then(() => {
          router.push({ name: 'login' });
        })
        .catch(() => {
          router.push({ name: 'login' });
        })
        .finally(() => {
          isLoginFailWarning = false;
        });
    } else if (res.CODE !== 0 && res.code !== 200 && res.retCode !== 200) {
      Message({
        message: res.MESSAGE || res.msg || res.retMessage || '服务器傲娇了',
        type: 'error'
      });
    }
    return response;
  },
  (error) => Promise.reject(error)
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
        Message({
          message: '请求超时!请稍后再试',
          type: 'error'
        });
      });
  });
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
        Message({
          message: '请求超时!请稍后再试',
          type: 'error'
        });
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
        Message({
          message: '请求超时!请稍后再试',
          type: 'error'
        });
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
        Message({
          message: '请求超时!请稍后再试',
          type: 'error'
        });
      }
    );
  });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, { params }).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
        Message({
          message: '请求超时!请稍后再试',
          type: 'error'
        });
      }
    );
  });
}

export const { baseURL } = axios.defaults;
