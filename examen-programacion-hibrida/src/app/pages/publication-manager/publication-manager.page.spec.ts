import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationManagerPage } from './publication-manager.page';

describe('PublicationManagerPage', () => {
  let component: PublicationManagerPage;
  let fixture: ComponentFixture<PublicationManagerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
