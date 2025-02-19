import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPlaceComponent } from './add-edit-place.component';

describe('AddEditPlaceComponent', () => {
  let component: AddEditPlaceComponent;
  let fixture: ComponentFixture<AddEditPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
