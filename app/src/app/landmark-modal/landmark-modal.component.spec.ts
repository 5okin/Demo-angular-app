import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkModalComponent } from './landmark-modal.component';

describe('LandmarkModalComponent', () => {
  let component: LandmarkModalComponent;
  let fixture: ComponentFixture<LandmarkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandmarkModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandmarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
