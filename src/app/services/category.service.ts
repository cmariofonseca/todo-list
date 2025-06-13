import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { Category } from '../models/interfaces/category';
import { CATEGORY_KEY } from '../models/constants/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly storage: StorageService) {}

  async getCategories(): Promise<Category[]> {
    return (
      (await this.storage.get(CATEGORY_KEY)) || [
        { id: 'trabajo', name: 'Trabajo' },
        { id: 'personal', name: 'Personal' },
        { id: 'estudio', name: 'Estudio' },
      ]
    );
  }

  async saveCategories(categories: Category[]) {
    await this.storage.set(CATEGORY_KEY, categories);
  }

  async addCategory(name: string) {
    const id = name.toLowerCase().trim();
    const categories = await this.getCategories();
    if (!categories.some((c) => c.id === id)) {
      categories.push({ id, name });
      await this.saveCategories(categories);
    }
  }

  async updateCategory(id: string, newName: string): Promise<void> {
    const categories = await this.getCategories();
    const index = categories.findIndex((c) => c.id === id);

    if (index > -1) {
      categories[index] = { id: newName.toLowerCase().trim(), name: newName };
      await this.saveCategories(categories);
    }
  }

  async deleteCategory(id: string) {
    const categories = await this.getCategories();
    const updated = categories.filter((c) => c.id !== id);
    await this.saveCategories(updated);
  }
}
