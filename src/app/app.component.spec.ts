import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FirebaseConfigService } from './services/firebase-config.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let firebaseConfigServiceSpy: jasmine.SpyObj<FirebaseConfigService>;

  beforeEach(() => {
    // Creamos un spy del servicio
    const spy = jasmine.createSpyObj('FirebaseConfigService', [
      'loadFeatureFlags',
    ]);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: FirebaseConfigService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    firebaseConfigServiceSpy = TestBed.inject(
      FirebaseConfigService
    ) as jasmine.SpyObj<FirebaseConfigService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadFeatureFlags on ngOnInit', () => {
    component.ngOnInit();
    expect(firebaseConfigServiceSpy.loadFeatureFlags).toHaveBeenCalled();
  });
});
