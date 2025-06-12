import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isReady = false;

  constructor(private readonly storage: Storage) {}

  async init(): Promise<void> {
    if (!this.isReady) {
      await this.storage.create();
      this.isReady = true;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    return await this.storage.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }

  async clear(): Promise<void> {
    await this.storage.clear();
  }
}
