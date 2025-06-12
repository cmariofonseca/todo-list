import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';

describe('LayoutPage', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
