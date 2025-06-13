import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Layout } from './layout';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'add-task',
        loadChildren: () =>
          import('../pages/add-task/add-task.module').then(
            (m) => m.AddTaskPageModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../pages/categories/categories.module').then(
            (m) => m.CategoriesPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
