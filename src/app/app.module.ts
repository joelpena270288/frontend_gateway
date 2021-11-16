import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GatewayComponent } from './components/gateway/gateway.component';
import { PeripheralDeviceComponent } from './components/peripheral-device/peripheral-device.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    GatewayComponent,
    PeripheralDeviceComponent,
   
    
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    NgbModule
    

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
