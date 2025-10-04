import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeWriterService {
  textList: string[] = [
    'Programming is not just about writing code; it is about solving problems logically and efficiently. Each line you write represents a step toward automating a task, building a product, or creating something innovative. Good programmers think in terms of breaking down big problems into smaller, manageable parts.',
    'Debugging is one of the most underrated skills in software development. When your code does not work as expected, the ability to patiently trace through logic, inspect variables, and use debugging tools becomes invaluable. In many cases, debugging teaches more about programming than writing new code.',
    'Learning multiple programming languages broadens your perspective as a developer. While Python emphasizes simplicity and readability, languages like C++ focus on performance and memory management. Exposure to different paradigms helps you choose the right tool for the right problem.',
    'Version control systems like Git are essential for modern programming. They allow teams to collaborate, track changes, and roll back to previous states if something breaks. Without version control, large software projects would quickly become unmanageable.',
    'Clean code is more valuable than clever code. Writing code that is easy to read and maintain saves time for both you and your team in the long run. Following consistent naming conventions, adding meaningful comments, and organizing files properly all contribute to better software quality.',
    'Hello world'
  ];
  constructor() {}

  getRandomText() {
    let randomInt = this.randomIntFromInterval(0, this.textList.length);
    return this.textList[randomInt]
  }

  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  sendParaCompletionPercentBeat(percentCompleted: number){
    console.log(percentCompleted)
  }
}
