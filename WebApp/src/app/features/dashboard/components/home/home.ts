import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
// נתונים לדוגמה שיוצגו ברשימה
  recentItems = [
    { id: '2034556', status: 'נקלט בתחנה', time: '12:40' },
    { id: '1099233', status: 'מוכן לשינוע', time: '12:15' },
    { id: '3349002', status: 'הועבר לטהרה', time: '11:50' },
  ];

  constructor() { }
}
