import { Injectable } from '@angular/core';
import { fetchAndActivate } from 'firebase/remote-config';
import { remoteConfig } from '../../environments/firebase-config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseConfigService {
  async load(): Promise<void> {
    try {
      await fetchAndActivate(remoteConfig);
    } catch (error) {
      console.error('Remote Config fetch failed', error);
    }
  }
}
