import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { Task } from '../models/interfaces/task';
import { STORAGE_KEYS } from '../models/constants/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private cachedTasks: Task[] = [];
  private readonly TASKS_KEY = STORAGE_KEYS.TASKS;

  constructor(private readonly storage: StorageService) {}

  async getAll(): Promise<Task[]> {
    this.clearCache();
    const tasks: Task[] = (await this.storage.get(STORAGE_KEYS.TASKS)) || [];
    this.cachedTasks = tasks;
    return tasks;
  }

  async add(task: Omit<Task, 'id'>): Promise<void> {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };

    const tasks = await this.getAll();
    tasks.push(newTask);
    await this.storage.set(this.TASKS_KEY, tasks);

    this.clearCache();
  }

  async update(updatedTask: Task): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);

    if (index > -1) {
      tasks[index] = updatedTask;
      await this.storage.set(this.TASKS_KEY, tasks);
      this.clearCache();
    }
  }

  async delete(id: string): Promise<void> {
    let tasks = await this.getAll();
    tasks = tasks.filter((t) => t.id !== id);
    await this.storage.set(this.TASKS_KEY, tasks);
    this.clearCache();
  }

  async getByCategory(category: string): Promise<Task[]> {
    const all = await this.getAll();
    return category === 'all'
      ? all
      : all.filter((t) => t.category === category);
  }

  async toggleCompleted(task: Task): Promise<void> {
    const updatedTask = { ...task, completed: !task.completed };
    await this.update(updatedTask);
  }

  clearCache() {
    this.cachedTasks = [];
  }
}
