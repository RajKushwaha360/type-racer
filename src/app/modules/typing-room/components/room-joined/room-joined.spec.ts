import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomJoined } from './room-joined';

describe('RoomJoined', () => {
  let component: RoomJoined;
  let fixture: ComponentFixture<RoomJoined>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomJoined]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomJoined);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
