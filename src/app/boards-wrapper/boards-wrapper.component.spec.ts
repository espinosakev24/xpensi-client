import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsWrapperComponent } from './boards-wrapper.component';

describe('BoardsWrapperComponent', () => {
  let component: BoardsWrapperComponent;
  let fixture: ComponentFixture<BoardsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
