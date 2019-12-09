import { get, post } from "app/utils/NetworkUtil";
import ApiConfig from "./ApiConfig";

export default class ApiCourier extends ApiConfig {
  addCourier(options) {
    let config = {}
    const formattedPhone = `+55${options.mobilePhone.replace(/\D/g, "")}`
    const formattedPlate = options.plate.replace("-", "")

    if (options.cnh) {
      config = {
        data: {
          courier: {
            name: options.name,
            email: options.email,
            cnh: options.cnh,
            cnhNumber: options.cnhNumber,
            password: options.password,
            mobilePhone: formattedPhone,
            currentEquipment: {
              brand: options.brand,
              model: options.model,
              year: options.year,
              plate: formattedPlate
            }
          }
        }
      }
    } else {
      config = {
        data: {
          courier: {
            cnh: options.cnh,
            name: options.name,
            email: options.email,
            mobilePhone: formattedPhone,
            password: options.password,
          }
        }
      }
    }

    const url = `/couriers`
    return post(this.baseUrl, url, config)
  }
}