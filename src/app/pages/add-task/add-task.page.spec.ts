import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddTaskPage } from './add-task.page';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

describe('AddTaskPage', () => {
  let component: AddTaskPage;
  let fixture: ComponentFixture<AddTaskPage>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockToastCtrl: jasmine.SpyObj<ToastController>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToast: any;

  beforeEach(waitForAsync(() => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['add', 'update']);
    mockCategoryService = jasmine.createSpyObj('CategoryService', [
      'getCategories',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockToast = jasmine.createSpyObj('Toast', ['present']);
    mockToastCtrl = jasmine.createSpyObj('ToastController', ['create']);
    mockToastCtrl.create.and.returnValue(Promise.resolve(mockToast));

    TestBed.configureTestingModule({
      declarations: [AddTaskPage],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: ToastController, useValue: mockToastCtrl },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in create mode if no task passed in navigation state', () => {
    component.ngOnInit();
    expect(component.isEditMode).toBeFalse();
    expect(component.task).toEqual(
      jasmine.objectContaining({
        title: '',
        completed: false,
        id: '',
        category: 'trabajo',
      })
    );
  });

  it('should initialize in edit mode if task is in navigation state', () => {
    const mockTask = {
      id: '1',
      title: 'test',
      completed: false,
      category: 'trabajo',
    };
    spyOnProperty(window.history, 'state', 'get').and.returnValue({
      task: mockTask,
    });

    component.ngOnInit();
    expect(component.isEditMode).toBeTrue();
    expect(component.task).toEqual(mockTask);
  });

  it('should call loadCategories on init and ionViewWillEnter', waitForAsync(async () => {
    const mockCategories = [{ id: 'personal', name: 'Personal' }];
    mockCategoryService.getCategories.and.returnValue(
      Promise.resolve(mockCategories)
    );

    await component.ionViewWillEnter();

    expect(component.categories).toEqual(mockCategories);
    expect(mockCategoryService.getCategories).toHaveBeenCalledTimes(2);
  }));

  it('should not save task if title is empty', async () => {
    spyOn(window, 'alert');
    component.task = {
      title: '   ',
      id: '',
      completed: false,
      category: 'trabajo',
    };

    await component.onSave();

    expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa un título');
    expect(mockTaskService.add).not.toHaveBeenCalled();
    expect(mockTaskService.update).not.toHaveBeenCalled();
  });

  it('should add a new task and navigate on save', async () => {
    component.isEditMode = false;
    component.task = {
      title: 'Nueva tarea',
      id: '',
      completed: false,
      category: 'trabajo',
    };

    await component.onSave();

    expect(mockTaskService.add).toHaveBeenCalledWith(component.task);
    expect(mockToastCtrl.create).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should update task and navigate on save in edit mode', async () => {
    component.isEditMode = true;
    component.task = {
      title: 'Editar tarea',
      id: '123',
      completed: false,
      category: 'trabajo',
    };

    await component.onSave();

    expect(mockTaskService.update).toHaveBeenCalledWith(component.task);
    expect(mockToastCtrl.create).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show success toast with correct message', async () => {
    await component.showSuccessToast('Éxito');
    expect(mockToastCtrl.create).toHaveBeenCalledWith({
      message: 'Éxito',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    expect(mockToast.present).toHaveBeenCalled();
  });
});
