import { Injectable } from '@angular/core';
import { getValue } from 'firebase/remote-config';

import { remoteConfig } from 'src/environments/firebase-config';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  async getFeature(key: string): Promise<string> {
    return Promise.resolve(getValue(remoteConfig, key).asString());
  }

  async isFeatureEnabled(key: string): Promise<boolean> {
    return Promise.resolve(getValue(remoteConfig, key).asBoolean());
  }

  async isTaskDeletionEnabled(): Promise<boolean> {
    return this.isFeatureEnabled('enable_task_deletion');
  }

  async isCategoryFilterEnabled(): Promise<boolean> {
    return this.isFeatureEnabled('enable_category_filter');
  }
}
