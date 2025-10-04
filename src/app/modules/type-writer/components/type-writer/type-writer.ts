import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TypeWriterService } from '../../services/type-writer';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-type-writer',
  imports: [MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './type-writer.html',
  styleUrls: ['./type-writer.scss'],
})
export class TypeWriter implements OnInit {
  typeString = 'This is a paragraph write over it';
  typeTempString = '';
  isActive = false;
  lastKeyPressed = '';
  currentIndex = 0;
  isTypingStarted = false;
  startTimeStamp?: number;
  endTimeStamp?: number;
  isFinished = signal(false);
  currentWordCount = 0;
  typingSpeedWPM = signal(0);
  @Output() playerProgress = new EventEmitter<{ progress: number; wpm: number }>();

  textColorArray: string[] = [];

  constructor(private typeWriterService: TypeWriterService) {}

  ngOnInit(): void {
    this.fetchData();

    this.typeTempString = this.typeString.replaceAll(' ', '•');

    this.currentWordCount = this.typeString.split(' ').length;
  }

  fetchData() {
    this.typeString = this.typeWriterService.getRandomText();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // You can add logic here to check if a specific element
    // should be affected, e.g., if (event.target !== this.myInput.nativeElement)
    if (!this.isActive) {
      return;
    }

    if (this.isTypingStarted == false) {
      this.isTypingStarted = true;
      this.startTimeStamp = Date.now();
    }

    console.log(event.code);

    if (
      event.code.substring(0, 3) == 'Key' ||
      event.code == 'Space' ||
      event.code == 'Period' ||
      event.code == 'Comma'
    ) {
      this.lastKeyPressed = event.key;
      this.updatedCurrentIndex();
    }
  }

  onResetClicked() {
    this.isTypingStarted = false;
    this.currentIndex = 0;
    this.textColorArray = [];
    this.lastKeyPressed = '';
    this.isFinished.set(false);
    this.typingSpeedWPM.set(0);
  }

  updatedCurrentIndex() {
    if (this.lastKeyPressed === this.typeString[this.currentIndex]) {
      if (this.textColorArray.length - 1 != this.currentIndex) {
        console.log('green');
        this.textColorArray.push('green');
      }
      this.currentIndex += 1;
    } else {
      if (this.textColorArray.length - 1 != this.currentIndex) {
        console.log('red');
        this.textColorArray.push('red');
      }
    }

    if (this.currentIndex == this.typeString.length) {
      this.afterTypeFinished();
    }
  }

  afterTypeFinished() {
    console.log('finished');
    this.endTimeStamp = Date.now();
    this.isActive = false;
    this.isFinished.set(true);

    if (!this.startTimeStamp) {
      return;
    }

    let milliDiff = this.endTimeStamp - this.startTimeStamp; // milli
    let secDiff = milliDiff / 1000;
    this.typingSpeedWPM.set((this.currentWordCount * 60) / secDiff);
  }

  // min = sec / 60
  // sec = min * 60

  onKeyPress(event: KeyboardEvent) {
    console.log(event);
  }
}
