import React from "react";
import axios from "axios";
import Constants from "./constants";

class Service {
  constructor() {
    let service = axios.create({
      baseURL: Constants.baseURL + Constants.namespace,
    });
    service.interceptors.request.use(function (config) {
       
         console.log(config)
        return config;
      }, function (error) {
        console.log(config)
        return Promise.reject(error);
      });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
   
    this.service = service;
  }

  handleSuccess(response) {
    
    return response;
  }

  handleError = (error) => {
   
    return Promise.reject(error);
  };

  get(path, params = {}, config = {}) {
    return this.service.get(path, {
      params,
      ...config,
    });
  }

  patch(path, payload, callback) {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => callback(response.data, response.status));
  }

  post(path, payload, config = {}) {
    if (payload instanceof FormData) {
      payload.append("key", Constants.api_key);
    } else {
      payload.key = Constants.api_key;
    }
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
      ...config,
    });
  }
}

export default new Service();