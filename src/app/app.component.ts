import { Component, OnInit } from '@angular/core';
import { FirebaseConfigService } from './services/firebase-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private readonly firebaseConfigService: FirebaseConfigService) {}

  ngOnInit(): void {
    this.firebaseConfigService.loadFeatureFlags();
  }
}
