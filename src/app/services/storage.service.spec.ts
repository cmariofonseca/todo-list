import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Storage', [
      'create',
      'get',
      'set',
      'remove',
      'clear',
    ]);

    TestBed.configureTestingModule({
      providers: [StorageService, { provide: Storage, useValue: spy }],
    });

    service = TestBed.inject(StorageService);
    storageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize storage only once', async () => {
    await service.init();
    await service.init(); // segunda llamada no debe volver a llamar create

    expect(storageSpy.create).toHaveBeenCalledTimes(1);
  });

  it('should get a value by key', async () => {
    storageSpy.get.and.resolveTo('test-value');

    const result = await service.get<string>('myKey');
    expect(result).toBe('test-value');
    expect(storageSpy.get).toHaveBeenCalledWith('myKey');
  });

  it('should set a value by key', async () => {
    storageSpy.set.and.resolveTo();

    await service.set('myKey', 'value');
    expect(storageSpy.set).toHaveBeenCalledWith('myKey', 'value');
  });

  it('should remove a value by key', async () => {
    storageSpy.remove.and.resolveTo();

    await service.remove('myKey');
    expect(storageSpy.remove).toHaveBeenCalledWith('myKey');
  });

  it('should clear all storage', async () => {
    storageSpy.clear.and.resolveTo();

    await service.clear();
    expect(storageSpy.clear).toHaveBeenCalled();
  });
});
