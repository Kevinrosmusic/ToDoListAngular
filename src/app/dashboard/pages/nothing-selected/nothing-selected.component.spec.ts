import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingSelectedComponent } from './nothing-selected.component';

describe('NothingSelectedComponent', () => {
  let component: NothingSelectedComponent;
  let fixture: ComponentFixture<NothingSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NothingSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NothingSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
