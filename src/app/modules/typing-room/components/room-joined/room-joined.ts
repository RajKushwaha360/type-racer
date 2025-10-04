import { Component } from '@angular/core';
import { TypeWriter } from '../../../type-writer/components/type-writer/type-writer';

@Component({
  selector: 'app-room-joined',
  imports: [TypeWriter],
  templateUrl: './room-joined.html',
  styleUrl: './room-joined.scss',
})
export class RoomJoined {
  roomId: number = 0;

}
