import { Injectable } from '@angular/core';
import axios from 'axios';

import { Gateway } from '../interfaces/gateway';
import { PeripheralDevice } from '../interfaces/peripheral-device';
@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor() { }
 async getAllGateway():Promise<any> {  
    
  
   return await axios.get("api/gateway");
 }
  async deleteGateway(id: string) {
    return await axios.delete("api/gateway/"+id);
  }
  async createGateway(gateway: Gateway) {
    return await axios.post("api/gateway/" , gateway);
  }
  async getAllByIdGateway(id: string) {
   
    return await axios.get("api/gateway/"+id);
  }
  async addPeriperalDevice(id: string, periperalDevice: PeripheralDevice) {
    return await axios.patch("api/gateway/"+id, periperalDevice) ;
  }
  async deletePeripheralDevice(id: string, periperal_device: PeripheralDevice) {
    return await axios.patch("api/gateway/delete_peripheral_device/" + id, periperal_device);
  }
  
}

