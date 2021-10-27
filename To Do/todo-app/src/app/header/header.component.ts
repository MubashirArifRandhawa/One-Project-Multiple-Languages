import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  day: string;
  date: string;
  todaysDate: Date;
  constructor() {
    this.day = '';
    this.date = '';
    this.todaysDate = new Date();
  }
  ngOnInit(): void {}
  get Day() {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[this.todaysDate.getDay()];
  }
  get Date() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${
      months[this.todaysDate.getMonth()]
    } ${this.todaysDate.getDate()}, ${this.todaysDate.getFullYear()}`;
  }
}
