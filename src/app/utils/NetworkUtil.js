import axios from "axios";
import firebaseService from "app/config/firebase/index";

// @see: https://github.com/mzabriskie/axios#axios-api
const request = async (baseURL, method, url, config = {}, options = {}) => {
  // console.log(config)
  const { params, data, headers, maxContentLength } = config;

  // non-axios specific params
  const { suppressAuth } = options;
  const token = await firebaseService.getUserToken()

  return new Promise((resolve, reject) => {
    axios({
      method,
      baseURL,
      url,
      params,
      data: data,
      headers: suppressAuth
        ? headers
        : { ...headers, accesstoken: token },
      maxContentLength
    })
      .then(response => {
        // console.log(response)
        resolve({
          ...response,
          data: response.data
        });
      })
      .catch(error => {
        console.log("NetWork", error);
        reject(error);
      });
  });
}

export function get(baseUrl, url, config, options) {
  return request(baseUrl, "GET", url, config, options);
}

export function post(baseUrl, url, config, options) {
  return request(baseUrl, "POST", url, config, options);
}

export function put(baseUrl, url, config, options) {
  return request(baseUrl, "PUT", url, config, options);
}

// not "delete()" because of reserved word
export function destroy(baseUrl, url, config, options) {
  return request(baseUrl, "DELETE", url, config, options);
}
