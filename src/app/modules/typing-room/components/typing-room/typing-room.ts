import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SignalrService } from '../../../../shared/services/signalr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, scan } from 'rxjs';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { UserDTO } from '../../interfaces/user';
import { TypeWriter } from '../../../type-writer/components/type-writer/type-writer';

@Component({
  selector: 'app-typing-room',
  imports: [MatButton, ReactiveFormsModule, CommonModule, AsyncPipe, MatFormField, MatLabel,MatInput,TypeWriter],
  templateUrl: './typing-room.html',
  styleUrl: './typing-room.scss',
})
export class TypingRoom {
  playerJoined$:
    | Observable<{
        username: string;
        players: UserDTO[];
        roomId: string;
      }>
    | undefined;
  isRoomJoined = signal(false);
  logList$: Observable<string[]> | undefined;
  currentRoomId: string = '';
  userNameForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  isCompetitionStarted = signal(false);

  constructor(public signalRService: SignalrService) {}

  onPlayerProgress(event: {progress:number, wpm:number}){

  }

  joinRandomRoom() {
    console.log(this.userNameForm.value.name);

    let userName = this.userNameForm.value.name;
    if (!this.userNameForm.valid || !userName) {
      return;
    }

    this.signalRService.startConnection(userName);

    this.playerJoined$ = this.signalRService.playerJoined$;
    this.signalRService.playerJoined$.subscribe((value) => {
      this.currentRoomId = value.roomId;
    });

    // this.playerList$ = this.signalRService.playerJoined$.pipe(
    //   scan((acc, player) => [...acc, player.username], [] as string[])
    // );
    this.logList$ = this.signalRService.playerJoined$.pipe(
      scan((acc, player) => [...acc, `${player.username} joined`], [] as string[])
    );

    this.signalRService.startCompetition$.subscribe((value)=>{
      this.isCompetitionStarted.set(true)
    });

    this.isRoomJoined.set(true);
  }
}
