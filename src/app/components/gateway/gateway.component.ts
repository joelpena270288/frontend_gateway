import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Gateway } from 'src/app/interfaces/gateway';
import { GatewayService } from "../../services/gateway.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
export interface TableData {
  serial_number: string;
  position: number;
  name: string;
  IPv4: string;
  Actions: string[];
}
@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class GatewayComponent implements OnInit {
 
  //'serial_number', 'name', 'IPv4'
  ELEMENT_DATA:TableData[]=[];
  gateways: Gateway[]=[];
  displayedColumns: string[] = ['position','serial_number', 'name', 'IPv4','Actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  gateway_selected = -1;
  constructor(private readonly gatewayService: GatewayService, public dialog: MatDialog, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false; 
  }
  
  open(content: any,position) {
    this.modalService.open(content);

  }

  ngOnInit(): void {
    this.initData();
  }
 async initData() {
 await this.gatewayService.getAllGateway().then(response => (this.gateways = response.data))
  .catch(error =>  console.log(
    error.response.data.message
  ));
  
  
  for (let index = 0; index < this.gateways.length; index++) {
    let table_data: TableData = { position: index + 1, serial_number: this.gateways[index].serial_number, name: this.gateways[index].name, IPv4: this.gateways[index].IPv4, Actions:  ["View","Delete"] };
    this.ELEMENT_DATA.push(table_data);
    
  }
  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Mostrar(element: string) {
    alert(element);
  }
  DeleteGateway() {
    
  }
 

}
