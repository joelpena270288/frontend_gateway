import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Gateway } from 'src/app/interfaces/gateway';
import { GatewayService } from "../../services/gateway.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PeripheralDevice } from 'src/app/interfaces/peripheral-device';
import { NotifierService } from 'angular-notifier';
import dateFormat, { masks } from "dateformat";
//Interface to load data from the table of gateway
export interface TableData {
  serial_number: string;
  position: number;
  name: string;
  IPv4: string;
  Actions: string[];
  id: string;
}
//Interface to load data from the table of peripheral devices
export interface TablePeripheralDevice {
  id?: number;
   
  UID: number;
 
  vendor: string;

  date_created: Date;

  status: string;
 
}

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class GatewayComponent implements OnInit {
  private readonly notifier: NotifierService;
  //
  gateways: Gateway[]=[];//arrangement with gateways
  ELEMENT_DATA:TableData[]=[];//fix to show table with gateways
 
  displayedColumns: string[] = ['position','serial_number', 'name', 'IPv4','Actions'];//Gateway table columns
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);//gateways table item
  
  gateway_selected = -1;//store the id of a gateway
  //variables to save the data of a gateway to add it
  serial_number = "";
  name_gateway = "";
  ip_gateway = "";

  // variables to save the data of a peripheral device to add it

  uid = 0;
  vendor = "";
  date_created = "";
  online = "";
  offline = "";
  status = "";
  // variable to select the mode to add a peripheral device
  modeAddPeropheral = "";

  //elements to show the table of peripheral devices in the view of adding a gateway
  selectedPeripheral: PeripheralDevice = {UID:-1,date_created: new Date(),status:"",vendor:""};

  PERIPHERAL_DEVICE: TablePeripheralDevice[] = [];
  page = 1;
  pageSize = 4;

  collectionSize = this.PERIPHERAL_DEVICE.length;
  peripheral_device_data: TablePeripheralDevice[] = [];
//variable to store the selected gateway
  gatewaySelected: Gateway = {id: "",IPv4: "",name: "",serial_number: "",peripherals_devices: []};
  
  constructor(private readonly gatewayService: GatewayService, public dialog: MatDialog, config: NgbModalConfig, private modalService: NgbModal, notifierService: NotifierService) {
    this.notifier = notifierService;
    config.backdrop = 'static';
    config.keyboard = false;
    this.refreshPeripheralDevice();
  }
  //paging the devices table in the add gateway view
  refreshPeripheralDevice() {
    this.peripheral_device_data = this.PERIPHERAL_DEVICE
    .map((peripheral, i) => ({id: i + 1, ...peripheral}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  
  open(content: any, position: number) {
    this.gateway_selected = position;
    this.modalService.open(content);

  }
  //Raise the modal to add a gateway
  newGateway(content: any) {
    
    this.modalService.open(content,{ size: 'lg' });

  }
//Raise the modal to add a peripheral device
  newPeripheral(addperipheral: any) {
    this.modalService.open(addperipheral);
    this.modeAddPeropheral = "many";
  }
//Method to add a peripheral device
 async NewPeripheral() {
    let status_check = "online";
   
    if (this.offline) {
      status_check = "offline";
    }
    if (this.modeAddPeropheral==="many") { 
   
    
      this.peripheral_device_data.push({ id: this.PERIPHERAL_DEVICE.length + 1, UID: this.uid, date_created: new Date(this.date_created), status: status_check, vendor: this.vendor });
      this.PERIPHERAL_DEVICE.push(({ id: this.PERIPHERAL_DEVICE.length + 1, UID: this.uid, date_created: new Date(this.date_created), status: status_check, vendor: this.vendor }));
      this.cleanPeripheral();
      this.modeAddPeropheral = "";
    }
    if (this.modeAddPeropheral === "one") {
      const periperalDevice: PeripheralDevice = { UID: this.uid, date_created: new Date(this.date_created), status: status_check, vendor: this.vendor };
     
      await this.gatewayService.addPeriperalDevice(this.gatewaySelected.id, periperalDevice).then(response => (this.gatewaySelected = response.data, this.notifier.notify('success', 'The Peripheral Device was successfully added')))
      .catch(error => this.notifier.notify('error',
        error.response.data.message
      ));
      this.modeAddPeropheral = "";
      this.cleanPeripheral();
    }
 }
  //clear input values
  cleanPeripheral() {
    this.uid = 0;
  this.vendor = "";
  this.date_created = "";
  this.online = "";
  this.offline = "";
  this.status = "";
  }
   //clear input values
  cleanGateway() {
    this.serial_number = "";
  this.name_gateway = "";
  this.ip_gateway = "";
  }
  //Method to add a gateway
  async AddGateway() {
    let array_peripheral_device: PeripheralDevice[] = [];
    for (let index = 0; index < this.PERIPHERAL_DEVICE.length; index++) {
      array_peripheral_device.push({ UID: this.PERIPHERAL_DEVICE[index].UID, status: this.PERIPHERAL_DEVICE[index].status, vendor: this.PERIPHERAL_DEVICE[index].vendor, date_created: this.PERIPHERAL_DEVICE[index].date_created});
    }
    let send_gateway: Gateway = {id:"", IPv4: this.ip_gateway, name: this.name_gateway, serial_number: this.serial_number, peripherals_devices: array_peripheral_device };
     await this.gatewayService.createGateway(send_gateway).then(response => this.notifier.notify('success', 'The Gateway was successfully added'))
    .catch(error => this.notifier.notify('error',
      error.response.data.message
    ));
   await this.initData();
    this.cleanGateway();
    this.cleanPeripheral();
    this.peripheral_device_data = [];
    this.PERIPHERAL_DEVICE = [];
  }

  ngOnInit(): void {
    this.initData();
  }
  async initData() {
    this.ELEMENT_DATA = [];
 await this.gatewayService.getAllGateway().then(response => (this.gateways = response.data))
  .catch(error =>  this.notifier.notify('error',
  "Eror in Api Server"
));
  
  for (let index = 0; index < this.gateways.length; index++) {
    let table_data: TableData = { position: index + 1, serial_number: this.gateways[index].serial_number, name: this.gateways[index].name, IPv4: this.gateways[index].IPv4, Actions:  ["View","Delete"] , id: this.gateways[index].id };
    this.ELEMENT_DATA.push(table_data);
    
  }
  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 //Method to delete a gateway
  async DeleteGateway() {

     await this.gatewayService.deleteGateway(this.gateways[this.gateway_selected - 1].id).then(response => (this.gateways = response.data, this.notifier.notify('success', 'The Gateway was successfully removed')))
    .catch(error =>  this.notifier.notify("error",
      error.response.data.message
    ));
   
    await this.initData();
    this.cleanPeripheral();
    this.cleanGateway();
  }
  //Load the data of the selected gateway
  async viewGateway(viewgateway:any, id: string) {

    this.modalService.open(viewgateway,{ size: 'lg' });
  await  this.gatewayService.getAllByIdGateway(id).then(response => (this.gatewaySelected = response.data))
    .catch(error =>  this.notifier.notify("error",
    error.response.data.message
  ));
  }
  //transform date format
  formatDate(dataselected: Date) {
   return dateFormat(dataselected, "fullDate");
    
  }
//lift the modal to add a single device
  addOnePeripheral(addperipheral:any) {
    this.modalService.open(addperipheral);    
    this.modeAddPeropheral = "one";
  }
  //Create the peripheral device to delete
 async  selectForDeletePeriperal(deleteperipheral: any, peripheral: PeripheralDevice) {
   this.selectedPeripheral.UID = peripheral.UID;
   this.selectedPeripheral.date_created = peripheral.date_created;
   this.selectedPeripheral.status = peripheral.status;
   this.selectedPeripheral.vendor = peripheral.vendor;
   
   this.modalService.open(deleteperipheral);
 }
 //Method to delete a device
  async DeletePeriperal() {
    let query_result;
    await this.gatewayService.deletePeripheralDevice(this.gatewaySelected.id, this.selectedPeripheral).then(response => (query_result= response.data, this.notifier.notify('success', 'The Peripheral device was successfully removed')))
    .catch(error =>  this.notifier.notify("error",
    error.response.data.message
    ));
    await  this.gatewayService.getAllByIdGateway(this.gatewaySelected.id).then(response => (this.gatewaySelected = response.data))
    .catch(error =>  this.notifier.notify("error",
    error.response.data.message
  ));
    
  }
 

}
