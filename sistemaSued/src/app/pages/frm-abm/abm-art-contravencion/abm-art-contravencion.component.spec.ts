import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmArtContravencionComponent } from './abm-art-contravencion.component';

describe('AbmArtContravencionComponent', () => {
  let component: AbmArtContravencionComponent;
  let fixture: ComponentFixture<AbmArtContravencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmArtContravencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmArtContravencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
