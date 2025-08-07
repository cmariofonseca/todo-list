import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesPage } from './categories.page';
import { CategoryService } from '../../services/category.service';
import { AlertController } from '@ionic/angular';

describe('CategoriesPage', () => {
  let component: CategoriesPage;
  let fixture: ComponentFixture<CategoriesPage>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let alertSpy: jasmine.SpyObj<HTMLIonAlertElement>;

  const mockCategories = [
    { id: 'trabajo', name: 'Trabajo' },
    { id: 'personal', name: 'Personal' },
  ];

  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
      'getCategories',
      'addCategory',
      'updateCategory',
      'deleteCategory',
    ]);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);

    TestBed.configureTestingModule({
      declarations: [CategoriesPage],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', async () => {
    categoryServiceSpy.getCategories.and.resolveTo(mockCategories);
    await component.loadCategories();
    expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
  });

  it('should add a new category', async () => {
    component.newCategoryName = 'Nuevo';
    await component.addNewCategory();
    expect(categoryServiceSpy.addCategory).toHaveBeenCalledWith('Nuevo');
    expect(component.newCategoryName).toBe('');
    expect(component.textButton).toBe('AGREGAR');
  });

  it('should update existing category', async () => {
    component.selectedCategoryId = 'trabajo';
    component.newCategoryName = 'Trabajo Actualizado';
    await component.addNewCategory();
    expect(categoryServiceSpy.updateCategory).toHaveBeenCalledWith(
      'trabajo',
      'Trabajo Actualizado'
    );
  });

  it('should set edit mode when editCategory is called', () => {
    const category = mockCategories[0];
    component.editCategory(category);
    expect(component.newCategoryName).toBe('Trabajo');
    expect(component.selectedCategoryId).toBe('trabajo');
    expect(component.textButton).toBe('ACTUALIZAR');
  });

  it('should show delete confirmation alert', async () => {
    alertControllerSpy.create.and.resolveTo(alertSpy);
    await component.deleteCategory('trabajo');
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Confirmar eliminación',
      message:
        '¿Estás seguro de eliminar esta categoría? Esta acción no se puede deshacer.',
      buttons: jasmine.any(Array),
    });
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should call deleteCategory and reload list when confirmed', async () => {
    categoryServiceSpy.deleteCategory.and.resolveTo();
    const loadSpy = spyOn(component, 'loadCategories');
    const alert = {
      present: () => Promise.resolve(),
      buttons: [{ role: 'cancel' }, { handler: () => {} }],
    };
    alertControllerSpy.create.and.resolveTo(alert as any);

    await component.deleteCategory('trabajo');

    const createCall = alertControllerSpy.create.calls.mostRecent();
    if (!createCall?.args[0]) {
      fail('create was not called or args[0] is undefined');
      return;
    }

    const buttons = createCall.args[0].buttons as any[];
    const handler = buttons[1]?.handler;

    if (!handler) {
      fail('handler is undefined');
      return;
    }

    await handler();

    expect(categoryServiceSpy.deleteCategory).toHaveBeenCalledWith('trabajo');
    expect(loadSpy).toHaveBeenCalled();
  });
});
