import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from 'src/app/services/category.service';

import { Task } from '../../models/interfaces/task';
import { Category } from 'src/app/models/interfaces/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedCategory: string = 'all';

  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadCategories();
  }

  async ionViewWillEnter() {
    await this.loadTasks();
    await this.loadCategories();
  }

  async loadTasks() {
    if (this.selectedCategory === 'all') {
      this.tasks = await this.taskService.getAll();
    } else {
      this.tasks = await this.taskService.getByCategory(this.selectedCategory);
    }
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  async onCategoryChange(event: any) {
    const category = event.detail.value;
    this.selectedCategory = category;
    await this.loadTasks();
  }

  async onTaskDeleted(taskId: string) {
    console.log('se llama a onTaskDeleted');
    this.tasks = await this.taskService.getAll();
  }

  trackByFn(index: number, item: Task): string {
    return item.id;
  }
}
