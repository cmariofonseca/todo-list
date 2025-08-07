import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../models/constants/storage-keys';
import { Task } from '../models/interfaces/task';

describe('TaskService', () => {
  let service: TaskService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockTasks: Task[] = [
    { id: '1', title: 'Tarea 1', completed: false, category: 'personal' },
    { id: '2', title: 'Tarea 2', completed: true, category: 'trabajo' },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StorageService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [TaskService, { provide: StorageService, useValue: spy }],
    });

    service = TestBed.inject(TaskService);
    storageServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all tasks', async () => {
    storageServiceSpy.get.and.resolveTo(mockTasks);

    const result = await service.getAll();
    expect(result).toEqual(mockTasks);
    expect(storageServiceSpy.get).toHaveBeenCalledWith(STORAGE_KEYS.TASKS);
  });

  it('should add a new task', async () => {
    const task = {
      title: 'Nueva tarea',
      completed: false,
      category: 'personal',
    };
    storageServiceSpy.get.and.resolveTo([]);
    storageServiceSpy.set.and.resolveTo();

    await service.add(task);

    expect(storageServiceSpy.set).toHaveBeenCalled();
    const savedTasks = storageServiceSpy.set.calls.argsFor(0)[1] as Task[];
    expect(savedTasks.length).toBe(1);
    expect(savedTasks[0].title).toBe('Nueva tarea');
    expect(savedTasks[0].id).toBeTruthy();
  });

  it('should update a task', async () => {
    const updatedTask = {
      id: '1',
      title: 'Actualizada',
      completed: true,
      category: 'personal',
    };
    storageServiceSpy.get.and.resolveTo(mockTasks);
    storageServiceSpy.set.and.resolveTo();

    await service.update(updatedTask);

    expect(storageServiceSpy.set).toHaveBeenCalledWith(
      STORAGE_KEYS.TASKS,
      jasmine.any(Array)
    );
    const result = storageServiceSpy.set.calls.argsFor(0)[1] as Task[];
    expect(result.find((t) => t.id === '1')?.title).toBe('Actualizada');
  });

  it('should delete a task', async () => {
    storageServiceSpy.get.and.resolveTo(mockTasks);
    storageServiceSpy.set.and.resolveTo();

    await service.delete('1');

    const updatedTasks = storageServiceSpy.set.calls.argsFor(0)[1] as Task[];
    expect(updatedTasks.length).toBe(1);
    expect(updatedTasks.find((t) => t.id === '1')).toBeUndefined();
  });

  it('should filter tasks by category', async () => {
    storageServiceSpy.get.and.resolveTo(mockTasks);

    const filtered = await service.getByCategory('personal');
    expect(filtered.length).toBe(1);
    expect(filtered[0].category).toBe('personal');
  });

  it('should return all tasks if category is "all"', async () => {
    storageServiceSpy.get.and.resolveTo(mockTasks);

    const result = await service.getByCategory('all');
    expect(result.length).toBe(2);
  });

  it('should toggle task completed status', async () => {
    const task = {
      id: '2',
      title: 'Tarea 2',
      completed: true,
      category: 'trabajo',
    };
    const updated = { ...task, completed: false };

    storageServiceSpy.get.and.resolveTo([task]);
    storageServiceSpy.set.and.resolveTo();

    await service.toggleCompleted(task);

    expect(storageServiceSpy.set).toHaveBeenCalledWith(STORAGE_KEYS.TASKS, [
      updated,
    ]);
  });

  it('should clear the cache', () => {
    (service as any).cachedTasks = [...mockTasks];
    service.clearCache();
    expect((service as any).cachedTasks).toEqual([]);
  });
});
