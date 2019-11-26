import { get, post } from "app/utils/NetworkUtil";
import ApiConfig from "./ApiConfig";

export default class ApiUsers extends ApiConfig {
  addUser(options) {
    const config = {
      data: {
        ...options
      }
    }
    const url = `/users`
    return post(this.baseUrl, url, config)
  }
}