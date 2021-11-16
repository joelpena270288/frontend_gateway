import { Injectable } from '@angular/core';
import axios from 'axios';

import { Gateway } from '../interfaces/gateway';
@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor() { }
 async getAllGateway():Promise<any> {  
    
  
   return await axios.get("api/gateway");
  }
  
}

