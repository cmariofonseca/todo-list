import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { CategoryService } from './category.service';

// Mock del StorageService
const mockStorageService = {
  get: jasmine.createSpy('get'),
  set: jasmine.createSpy('set'),
};

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: StorageService, useValue: mockStorageService },
      ],
    });

    service = TestBed.inject(CategoryService);
  });

  afterEach(() => {
    mockStorageService.get.calls.reset();
    mockStorageService.set.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('should return default categories when storage is empty', async () => {
      mockStorageService.get.and.returnValue(Promise.resolve(null));

      const categories = await service.getCategories();

      expect(categories).toEqual([
        { id: 'trabajo', name: 'Trabajo' },
        { id: 'personal', name: 'Personal' },
        { id: 'estudio', name: 'Estudio' },
      ]);
    });

    it('should return stored categories when they exist', async () => {
      const stored = [{ id: 'proyecto', name: 'Proyecto' }];
      mockStorageService.get.and.returnValue(Promise.resolve(stored));

      const categories = await service.getCategories();

      expect(categories).toBe(stored);
    });
  });

  describe('addCategory', () => {
    it('should add a new category if it does not exist', async () => {
      mockStorageService.get.and.returnValue(Promise.resolve([]));
      mockStorageService.set.and.returnValue(Promise.resolve(undefined));

      await service.addCategory('Nuevo Proyecto');

      expect(mockStorageService.set).toHaveBeenCalledWith('categories', [
        { id: 'nuevo proyecto', name: 'Nuevo Proyecto' },
      ]);
    });

    it('should not add category if it already exists', async () => {
      const existing = [{ id: 'proyecto', name: 'Proyecto' }];
      mockStorageService.get.and.returnValue(Promise.resolve(existing));

      await service.addCategory('Proyecto');

      expect(mockStorageService.set).not.toHaveBeenCalled();
    });
  });

  describe('updateCategory', () => {
    it('should update category name and id', async () => {
      const categories = [{ id: 'proyecto', name: 'Proyecto' }];
      mockStorageService.get.and.returnValue(Promise.resolve(categories));
      mockStorageService.set.and.returnValue(Promise.resolve(undefined));

      await service.updateCategory('proyecto', 'Nuevo Nombre');

      expect(mockStorageService.set).toHaveBeenCalledWith('categories', [
        { id: 'nuevo nombre', name: 'Nuevo Nombre' },
      ]);
    });
  });

  describe('deleteCategory', () => {
    it('should remove category by id', async () => {
      const categories = [
        { id: 'trabajo', name: 'Trabajo' },
        { id: 'personal', name: 'Personal' },
      ];
      mockStorageService.get.and.returnValue(Promise.resolve(categories));
      mockStorageService.set.and.returnValue(Promise.resolve(undefined));

      await service.deleteCategory('personal');

      expect(mockStorageService.set).toHaveBeenCalledWith('categories', [
        { id: 'trabajo', name: 'Trabajo' },
      ]);
    });
  });
});
