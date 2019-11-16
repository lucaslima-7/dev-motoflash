import axios from "axios";
import jwtService from "app/services/jwtService/jwtService";

function getAccessToken() {
  return jwtService.getAccessToken();
}

// @see: https://github.com/mzabriskie/axios#axios-api
export function request(baseURL, method, url, config = {}, options = {}) {
  // console.log(config)
  const { params, data, headers, maxContentLength } = config;

  // non-axios specific params
  const { suppressAuth } = options;

  // @see: https://tools.ietf.org/html/rfc6750
  const bearerToken = `Bearer ${getAccessToken()}`;

  //   axios.interceptors.response.use((response) => {
  //     return response;
  // }, function (error) {
  //   console.log(error)
  //     // Do something with response error
  //     // if (error.response.status === 401) {
  //     //     console.log('unauthorized, logging out ...');
  //     //     // auth.logout();
  //     //     // router.replace('/auth/login');
  //     // }
  //     return Promise.reject(error.response);
  // });

  return new Promise((resolve, reject) => {
    axios({
      method,
      baseURL,
      url,
      params,
      data: data,
      headers: suppressAuth
        ? headers
        : { ...headers, Authorization: bearerToken },
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
