import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboVinculoComponent } from './combo-vinculo.component';

describe('ComboVinculoComponent', () => {
  let component: ComboVinculoComponent;
  let fixture: ComponentFixture<ComboVinculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboVinculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboVinculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
