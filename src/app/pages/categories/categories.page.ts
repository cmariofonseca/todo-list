import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/models/interfaces/category';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  newCategoryName = '';
  selectedCategoryId: string | null = null;
  textButton: string = 'AGREGAR';

  constructor(
    private readonly categoryService: CategoryService,
    private readonly alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  async ionViewWillEnter() {
    await this.loadCategories();
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  async addNewCategory() {
    if (!this.newCategoryName.trim()) return;

    if (this.selectedCategoryId) {
      await this.categoryService.updateCategory(
        this.selectedCategoryId,
        this.newCategoryName
      );
    } else {
      await this.categoryService.addCategory(this.newCategoryName);
    }

    await this.loadCategories();

    this.newCategoryName = '';
    this.textButton = 'AGREGAR';
    this.selectedCategoryId = null;
  }

  editCategory(category: Category) {
    this.newCategoryName = category.name;
    this.textButton = 'ACTUALIZAR';
    this.selectedCategoryId = category.id;
  }

  async deleteCategory(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message:
        '¿Estás seguro de eliminar esta categoría? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.categoryService.deleteCategory(id).then(() => {
              this.loadCategories();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
