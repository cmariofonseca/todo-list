import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
  standalone: false,
})
export class Layout implements OnInit {
  constructor(
    private readonly storageService: StorageService,
    private readonly menuCtrl: MenuController
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  private async getAll() {
    await this.storageService.init();
  }

  async onNavigate() {
    await this.menuCtrl.close();
  }
}
