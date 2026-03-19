import { Injectable, signal } from '@angular/core';
import { DeceasedListItem } from 'src/app/features/dashboard/model/deceased';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  activeBags = signal<DeceasedListItem[]>(
  [
    {
      id: '101',
      fullName: 'ישראל ישראלי',
      identityNumber: '012345678',
      bagNumber: '7290001234567', // פורמט הברקוד מהתמונה
      location: 'תר"ח'
    },
    {
      id: '102',
      fullName: 'מוחמד עלי',
      identityNumber: '055443322',
      bagNumber: '7290007654321',
      location: 'תר"ח'
    },
    {
      id: '103',
      fullName: 'אחמד חסן',
      identityNumber: '011223344',
      bagNumber: '7290009988776',
      location: 'תר"ח'
    }
  ]);

  addBag(bag: DeceasedListItem) {
    if (this.activeBags().length < 3) {
      this.activeBags.update(bags => [...bags, bag]);
      return true;
    }
    return false;
  }

  removeBag(index: number) {
    this.activeBags.update(bags => bags.filter((_, i) => i !== index));
  }

  clearTransport() {
    this.activeBags.set([]);
  }
}
