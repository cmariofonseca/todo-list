import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { TaskService } from 'src/app/services/task.service';

import { Task } from '../../models/interfaces/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  standalone: false,
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<string>();

  constructor(
    private readonly taskService: TaskService,
    private readonly router: Router,
    private readonly alertController: AlertController
  ) {}

  async toggleCompleted(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    await this.taskService.update(updatedTask);
  }

  editTask(task: Task) {
    this.router.navigate(['/add-task'], { state: { task } });
  }

  async deleteTask(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar "${this.task.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.taskService.delete(id);
            this.taskDeleted.emit(this.task.id);
          },
        },
      ],
    });

    await alert.present();
  }
}
