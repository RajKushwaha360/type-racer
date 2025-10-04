import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingRoom } from './typing-room';

describe('TypingRoom', () => {
  let component: TypingRoom;
  let fixture: ComponentFixture<TypingRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
