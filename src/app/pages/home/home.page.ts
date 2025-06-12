import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private readonly taskService: TaskService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  async ionViewWillEnter() {
    await this.loadTasks();
  }

  private async loadTasks() {
    this.tasks = await this.taskService.getAll();
    console.log(this.tasks);
  }

  async toggleCompleted(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    await this.taskService.update(updatedTask);
    await this.loadTasks();
  }

  async deleteTask(id: string) {
    await this.taskService.delete(id);
    await this.loadTasks();
  }

  editTask(task: Task) {
    this.router.navigate(['/add-task'], { state: { task } });
  }

  async onCategoryChange(event: any) {
    const category = event.detail.value;
    this.tasks = await this.taskService.getByCategory(category);
  }
}
