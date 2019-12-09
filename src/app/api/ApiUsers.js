import { post, put } from "app/utils/NetworkUtil";
import ApiConfig from "./ApiConfig";

export default class ApiUsers extends ApiConfig {
  addUser(options) {
    const config = {
      data: {
        user: {
          ...options
        }
      }
    }
    const url = `/users`
    return post(this.baseUrl, url, config)
  }

  editUser({ options, id }) {
    const config = {
      data: {
        user: {
          ...options
        }
      }
    }
    const url = `/users/${id}`
    return put(this.baseUrl, url, config)
  }
}