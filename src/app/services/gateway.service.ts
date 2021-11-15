import { Injectable } from '@angular/core';
import { Axios } from 'axios';
import { NotifyService } from 'notify-angular';
import { Gateway } from '../interfaces/gateway';
@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(private axios: Axios, private notify: NotifyService) { }
 async getAllGateway():Promise<Gateway[] > {

    let gateway: Gateway[] = [];
    
  await this.axios.get("api/gateway").then(response => (gateway = response.data))
    .catch(error =>  this.notify.error(
      error.response.data.message
    ));
    return gateway;
  }
  
}

