import { Injectable } from '@angular/core';
import axios from 'axios';

import { Gateway } from '../interfaces/gateway';
import { PeripheralDevice } from '../interfaces/peripheral-device';
@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor() { }
  //Load all gateways from the database
 async getAllGateway():Promise<any> {    
  
   return await axios.get("api/gateway");
 }
  //Delete a gateway
  async deleteGateway(id: string) {
    return await axios.delete("api/gateway/"+id);
  }
  //Create a gateway
  async createGateway(gateway: Gateway) {
    return await axios.post("api/gateway/" , gateway);
  }
  //Get a gateway by id
  async getAllByIdGateway(id: string) {
   
    return await axios.get("api/gateway/"+id);
  }
  //Insert a gateway
  async addPeriperalDevice(id: string, periperalDevice: PeripheralDevice) {
    return await axios.patch("api/gateway/"+id, periperalDevice) ;
  }
  //Delete a gateway
  async deletePeripheralDevice(id: string, periperal_device: PeripheralDevice) {
    return await axios.patch("api/gateway/delete_peripheral_device/" + id, periperal_device);
  }
  
}

