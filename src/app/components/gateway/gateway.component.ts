import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/interfaces/gateway';
import { GatewayService } from "../../services/gateway.service";
@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements OnInit {
  gateways: Gateway[] = [];

  constructor(private readonly gatewayService: GatewayService) {
   
  }
   
  ngOnInit(): void {
    this.gatewayService.getAllGateway();
  }

}
