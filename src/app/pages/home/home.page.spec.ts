import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from 'src/app/services/category.service';
import { Task } from 'src/app/models/interfaces/task';
import { Category } from 'src/app/models/interfaces/category';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

  const mockTasks: Task[] = [
    { id: '1', title: 'Tarea 1', completed: false, category: 'trabajo' },
    { id: '2', title: 'Tarea 2', completed: true, category: 'personal' },
  ];

  const mockCategories: Category[] = [
    { id: 'trabajo', name: 'Trabajo' },
    { id: 'personal', name: 'Personal' },
  ];

  beforeEach(waitForAsync(() => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', [
      'getAll',
      'getByCategory',
    ]);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
      'getCategories',
    ]);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks and categories on ngOnInit', waitForAsync(async () => {
    taskServiceSpy.getAll.and.resolveTo(mockTasks);
    categoryServiceSpy.getCategories.and.resolveTo(mockCategories);

    component.ngOnInit();
    await fixture.whenStable();

    expect(taskServiceSpy.getAll).toHaveBeenCalled();
    expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.categories).toEqual(mockCategories);
  }));

  it('should load tasks and categories on ionViewWillEnter', async () => {
    taskServiceSpy.getAll.and.resolveTo(mockTasks);
    categoryServiceSpy.getCategories.and.resolveTo(mockCategories);

    await component.ionViewWillEnter();

    expect(taskServiceSpy.getAll).toHaveBeenCalled();
    expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
    expect(component.categories).toEqual(mockCategories);
  });

  it('should filter tasks by category when selectedCategory is not "all"', async () => {
    component.selectedCategory = 'trabajo';
    taskServiceSpy.getByCategory.and.resolveTo([mockTasks[0]]);

    await component.loadTasks();

    expect(taskServiceSpy.getByCategory).toHaveBeenCalledWith('trabajo');
    expect(component.tasks).toEqual([mockTasks[0]]);
  });

  it('should call getAll when selectedCategory is "all"', async () => {
    component.selectedCategory = 'all';
    taskServiceSpy.getAll.and.resolveTo(mockTasks);

    await component.loadTasks();

    expect(taskServiceSpy.getAll).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should update tasks when onTaskDeleted is triggered', async () => {
    taskServiceSpy.getAll.and.resolveTo(mockTasks);

    await component.onTaskDeleted('1');

    expect(taskServiceSpy.getAll).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should update selectedCategory and reload tasks on category change', async () => {
    const eventMock = { detail: { value: 'personal' } };
    taskServiceSpy.getByCategory.and.resolveTo([mockTasks[1]]);

    await component.onCategoryChange(eventMock);

    expect(component.selectedCategory).toBe('personal');
    expect(component.tasks).toEqual([mockTasks[1]]);
  });

  it('trackByFn should return task id', () => {
    const result = component.trackByFn(0, mockTasks[0]);
    expect(result).toBe('1');
  });
});
