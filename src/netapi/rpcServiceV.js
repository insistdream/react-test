import request from 'umi-request'; 

const API_DOMAIN = process.env.NODE_ENV === 'production' ? location.origin :  'http://localhost:9999';

/**
 * 处理请求地址
 */
const handleUrl = (url, { style }) => {
  if (style === 'default') {
    return API_DOMAIN + url;
  }
  return url;
};

/**
 * 处理请求参数
 */
const handleParams = (params, defaultParams, isBodyData) => {
  if(isBodyData) {
    return params
  }
  return {
    ...defaultParams,
    ...params,
  };
};

/**
 * 请求入口
 * @param {*} method 请求方法
 * @param {*} urls 请求地址
 * @param {*} some 一些其他的参数
 */
export default async function rpcService(method = 'GET', path, some = {}) {
  // 一些其他的参数
  const {
    defaultParams,
    params,
    customParams,
    timeout = (60 * 1000),
    style = 'default', // 'default'-默认 
    isExport = false,
    isFormData = false,
    isBodyData = false // post请求数据放body
  } = some;

  // 请求参数
  const data = handleParams(params, defaultParams, isBodyData);

  // 请求选项
  const options = {
    method : method.toUpperCase(),
    // headers: handleHeader(),
    timeout,
  };

  // 请求地址
  const url = handleUrl(path, { style });

  if (isExport) {
    options.responseType = 'blob';
  }
  
  // 请求选项-GET、DELETE
  if (method === 'GET' || method === 'DELETE') {
    if (customParams) {
      options.data = customParams;
    } else {
      options.params = data;
    }
  }

  // 请求选项-POST、PUT
  if (method === 'POST' || method === 'PUT') {
    if (!!isFormData) {
      options.data = data.formData;
    } else {
      if (customParams) {
        options.data = customParams;
      } else {
        options.data = data;
      }
    }
  }

  // 请求信息
  const info = {
    ...options,
    url,
  };

  // 发起请求
  const response = await request(url, options).catch((error) => {
    // throw handleStatus(error, info);
    throw error
  });

  // 最终结果
  return response;
}
