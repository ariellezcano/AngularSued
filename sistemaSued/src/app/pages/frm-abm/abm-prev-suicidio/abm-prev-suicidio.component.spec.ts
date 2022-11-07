import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPrevSuicidioComponent } from './abm-prev-suicidio.component';

describe('AbmPrevSuicidioComponent', () => {
  let component: AbmPrevSuicidioComponent;
  let fixture: ComponentFixture<AbmPrevSuicidioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmPrevSuicidioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmPrevSuicidioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
