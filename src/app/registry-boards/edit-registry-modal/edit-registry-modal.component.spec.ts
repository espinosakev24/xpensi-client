import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegistryModalComponent } from './edit-registry-modal.component';

describe('EditRegistryModalComponent', () => {
  let component: EditRegistryModalComponent;
  let fixture: ComponentFixture<EditRegistryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRegistryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
