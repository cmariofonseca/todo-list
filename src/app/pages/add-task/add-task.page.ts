import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../../models/interfaces/task';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: false,
})
export class AddTaskPage implements OnInit {
  task!: Task;

  constructor(
    private readonly taskService: TaskService,
    private readonly router: Router,
    private readonly toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.task = {
      id: '',
      title: '',
      completed: false,
      category: 'trabajo',
    };
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  async onSave() {
    console.log(this.task);
    await this.taskService.add(this.task);
    await this.presentToast('Tarea agregada exitosamente');
    this.router.navigate(['/home']);
  }
}
