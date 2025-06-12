import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { Layout } from './layout';
import { LayoutRoutingModule } from './layout-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    LayoutRoutingModule,
    RouterModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [Layout],
})
export class LayoutModule {}
