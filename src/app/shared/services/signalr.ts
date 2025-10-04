import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { UserDTO } from '../../modules/typing-room/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private roomId: string = '';
  private username: string = '';

  public players: UserDTO[] = [];

  // Subjects for events
  private playerJoinedSource = new Subject<{
    username: string;
    players: UserDTO[];
    roomId: string;
  }>();
  private startCompetitionSource = new Subject<{ players: UserDTO[] }>();
  private progressUpdateSource = new Subject<{ username: string; progress: number; wpm: number }>();

  // Exposed as observables
  playerJoined$ = this.playerJoinedSource.asObservable();
  startCompetition$ = this.startCompetitionSource.asObservable();
  progressUpdate$ = this.progressUpdateSource.asObservable();

  constructor() {}

  startConnection(username: string) {
    this.username = username;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7098/signal/typingParaHub') // adjust backend URL
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected.');
        this.joinRandomRoom();
      })
      .catch((err) => console.error('Error while starting connection: ' + err));

    this.registerHandlers();
  }

  private joinRandomRoom() {
    this.hubConnection.invoke('JoinRandomRoom', this.username).catch((err) => console.error(err));
  }

  private registerHandlers() {
    this.hubConnection.on('PlayerJoined', (username: string, players: UserDTO[], roomId: string) => {
      console.log(`Room Id: ${roomId}`);
      console.log(`${username} joined. Players: ${players.length}`);
      this.players = players;

      this.playerJoinedSource.next({ username, players, roomId });
    });

    this.hubConnection.on('StartCompetition', (players: UserDTO[]) => {
      console.log(`Starting competition in 3..2..1`);
      this.startCompetitionSource.next({ players });
    });

    this.hubConnection.on('ProgressUpdate', (username: string, progress: number, wpm: number) => {
      console.log(`${username}: ${progress}% - ${wpm} WPM`);
      this.progressUpdateSource.next({ username, progress, wpm });
    });
  }

  sendProgress(progress: number, wpm: number) {
    if (!this.roomId) {
      console.warn('Room not set yet!');
      return;
    }
    this.hubConnection
      .invoke('UpdateProgress', this.roomId, this.username, progress, wpm)
      .catch((err) => console.error(err));
  }

  setRoom(roomId: string) {
    this.roomId = roomId;
  }
}
