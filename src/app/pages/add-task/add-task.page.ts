import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { TaskService } from '../../services/task.service';

import { Task } from '../../models/interfaces/task';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/interfaces/category';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: false,
})
export class AddTaskPage implements OnInit {
  task!: Task;
  categories!: Category[];
  isEditMode: boolean = false;

  constructor(
    private readonly taskService: TaskService,
    private readonly router: Router,
    private readonly toastCtrl: ToastController,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const navigation = window.history.state;
    this.loadCategories();
    if (navigation?.task) {
      this.task = navigation.task;
      this.isEditMode = true;
    } else {
      this.task = {
        category: 'trabajo',
        completed: false,
        id: '',
        title: '',
      };
    }
  }

  async ionViewWillEnter() {
    await this.loadCategories();
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  async onSave() {
    if (!this.task.title.trim()) {
      alert('Por favor, ingresa un título');
      return;
    }

    if (this.isEditMode) {
      await this.taskService.update(this.task);
      this.showSuccessToast('Tarea actualizada');
    } else {
      await this.taskService.add(this.task);
      this.showSuccessToast('Tarea creada');
    }

    this.router.navigate(['/home']);
  }

  async showSuccessToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
