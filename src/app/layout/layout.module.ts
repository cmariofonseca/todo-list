import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { LayoutRoutingModule } from './layout-routing.module';

import { Layout } from './layout';

@NgModule({
  declarations: [Layout],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    LayoutRoutingModule,
    RouterModule,
    IonicStorageModule.forRoot(),
  ],
})
export class LayoutModule {}
