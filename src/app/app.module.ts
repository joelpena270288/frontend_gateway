import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GatewayComponent } from './components/gateway/gateway.component';
import { PeripheralDeviceComponent } from './components/peripheral-device/peripheral-device.component';
import { NotifyModule } from "notify-angular";
@NgModule({
  declarations: [
    AppComponent,
    GatewayComponent,
    PeripheralDeviceComponent
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotifyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
