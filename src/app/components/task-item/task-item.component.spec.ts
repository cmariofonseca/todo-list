import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { TaskService } from 'src/app/services/task.service';
import { FeatureFlagService } from 'src/app/services/feature-flag.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let featureFlagServiceSpy: jasmine.SpyObj<FeatureFlagService>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockTask = {
    id: '1',
    title: 'Tarea de prueba',
    completed: false,
    category: 'trabajo',
  };

  beforeEach(() => {
    featureFlagServiceSpy = jasmine.createSpyObj('FeatureFlagService', [
      'isFeatureEnabled',
    ]);
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['update', 'delete']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      providers: [
        { provide: FeatureFlagService, useValue: featureFlagServiceSpy },
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check feature flag on init', () => {
    featureFlagServiceSpy.isFeatureEnabled.and.resolveTo(true);
    component.ngOnInit();
    expect(featureFlagServiceSpy.isFeatureEnabled).toHaveBeenCalledWith(
      'enable_task_deletion'
    );
  });

  it('should update task completion status', async () => {
    taskServiceSpy.update.and.resolveTo();
    await component.toggleCompleted(mockTask);
    expect(taskServiceSpy.update).toHaveBeenCalledWith({
      ...mockTask,
      completed: true,
    });
  });

  it('should navigate to edit task', () => {
    component.editTask(mockTask);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/add-task'], {
      state: { task: mockTask },
    });
  });
});
