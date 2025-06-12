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

  constructor(private readonly taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  private async loadTasks() {
    this.tasks = await this.taskService.getAll();
    console.log(this.tasks);
  }
}
