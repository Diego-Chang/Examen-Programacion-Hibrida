import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicationManagerComponent } from './publication-manager.component';

describe('PublicationManagerComponent', () => {
  let component: PublicationManagerComponent;
  let fixture: ComponentFixture<PublicationManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PublicationManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
