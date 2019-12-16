import { put } from "app/utils/NetworkUtil";
import ApiConfig from "./ApiConfig";

export default class ApiWorkOrder extends ApiConfig {
  cancelWorkOrder({ id }) {
    const config = {
      data: {}
    }

    const url = `/workorders/${id}/cancel`
    return put(this.baseUrl, url, config)
  }
}