import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireRemoteConfigModule } from '@angular/fire/compat/remote-config';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';

import { CategoryService } from './services/category.service';
import { TaskService } from './services/task.service';
import { FirebaseConfigService } from './services/firebase-config.service';

import { AppComponent } from './app.component';

import { firebaseConfig } from '../environments/firebase-config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireRemoteConfigModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
    CategoryService,
    TaskService,
    FirebaseConfigService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
