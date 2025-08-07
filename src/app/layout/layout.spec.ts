import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { StorageService } from '../services/storage.service';
import { MenuController } from '@ionic/angular';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let menuControllerSpy: jasmine.SpyObj<MenuController>;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['init']);
    menuControllerSpy = jasmine.createSpyObj('MenuController', ['close']);

    TestBed.configureTestingModule({
      declarations: [Layout],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: MenuController, useValue: menuControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize storage on ngOnInit', () => {
    component.ngOnInit();
    expect(storageServiceSpy.init).toHaveBeenCalled();
  });

  it('should close menu on onNavigate', async () => {
    await component.onNavigate();
    expect(menuControllerSpy.close).toHaveBeenCalled();
  });
});
