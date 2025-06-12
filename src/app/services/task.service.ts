import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { Task } from '../models/interfaces/task';
import { STORAGE_KEYS } from '../models/constants/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly TASKS_KEY = STORAGE_KEYS.TASKS;

  constructor(private readonly storage: StorageService) {}

  async getAll(): Promise<Task[]> {
    const tasks: Task[] = (await this.storage.get(this.TASKS_KEY)) || [];
    return tasks;
  }

  async add(task: Omit<Task, 'id'>): Promise<void> {
    const tasks = await this.getAll();
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    tasks.push(newTask);
    await this.storage.set(this.TASKS_KEY, tasks);
  }

  async update(updatedTask: Task): Promise<void> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index > -1) {
      tasks[index] = updatedTask;
      await this.storage.set(this.TASKS_KEY, tasks);
    }
  }

  async delete(id: string): Promise<void> {
    let tasks = await this.getAll();
    tasks = tasks.filter((t) => t.id !== id);
    await this.storage.set(this.TASKS_KEY, tasks);
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
}
