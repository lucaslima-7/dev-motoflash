import { get, post } from "app/utils/NetworkUtil";
import ApiConfig from "./ApiConfig";

export default class ApiCourier extends ApiConfig {
  addCourier(options) {
    const config = {
      data: {
        courier: {
          ...options
        }
      }
    }
    const url = `/couriers`
    return post(this.baseUrl, url, config)
  }
}