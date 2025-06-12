import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';
import { LayoutPageRoutingModule } from './layout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    LayoutPageRoutingModule,
    RouterModule,
  ],
  declarations: [LayoutPage],
})
export class LayoutPageModule {}
