import { Component } from '@angular/core';
import { DeceasedListItem} from '../../model/deceased';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-manual-selection-bug',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './manual-selection-bug.html',
  styleUrl: './manual-selection-bug.scss',
})
export class ManualSelectionBug {

 selectedLocation: string = 'תר"ח'; // ערך התחלתי
  locations: string[] = ['תר"ח', 'אבו כביר', 'הכנה לקבורה'];

  public allDeceased: DeceasedListItem[] = [
    { id: '1', fullName: 'ישראל ישראלי', identityNumber: '012345678', bagNumber: 'BG-101', location: 'תר"ח' },
    { id: '2', fullName: 'משה כהן', identityNumber: '088776655', bagNumber: 'BG-102', location: 'אבו כביר' },
    { id: '3', fullName: 'אברהם לוי', identityNumber: '055443322', bagNumber: 'BG-103', location: 'תר"ח' },
    { id: '4', fullName: 'דוד אמזלג', identityNumber: '099887766', bagNumber: 'BG-104', location: 'הכנה לקבורה' },
    { id: '5', fullName: 'יוסי מזרחי', identityNumber: '011223344', bagNumber: 'BG-105', location: 'תר"ח' },
  ];

  // הסינון מתבצע רק לפי המיקום שנבחר ב-Select
  get filteredList() {
    return this.allDeceased.filter(d => d.location === this.selectedLocation);
  }

  onSelect(item: DeceasedListItem) {
    console.log('נבחר חלל מהרשימה:', item);
    // לוגיקת אישור בחירה
  }

}
