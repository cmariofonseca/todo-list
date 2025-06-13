import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/services/task.service';

import { Task } from '../../models/interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  selectedCategory: string = 'all';

  constructor(private readonly taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  async ionViewWillEnter() {
    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.taskService.getAll();
  }

  async onCategoryChange(event: any) {
    const category = event.detail.value;
    this.tasks = await this.taskService.getByCategory(category);
  }
}
