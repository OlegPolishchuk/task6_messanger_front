import {instance} from "api/instance/instance";

export class Api {
  static loginUser = async (username: string) => {
    return instance.post('/login', {username})
  }
  
}