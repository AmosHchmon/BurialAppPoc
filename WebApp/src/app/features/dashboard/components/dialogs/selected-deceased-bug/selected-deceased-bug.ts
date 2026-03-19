import { Component, Inject } from '@angular/core';
import { Deceased, Bag } from '../../../model/deceased';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-selected-deceased-bug',
  imports: [MatIconModule, MatDialogActions, MatDialogClose],
  templateUrl: './selected-deceased-bug.html',
  styleUrl: './selected-deceased-bug.scss',
})
export class SelectedDeceasedBug {

  constructor(
    public dialogRef: MatDialogRef<SelectedDeceasedBug>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // אובייקט החלל - תואם ל-deceased ב-HTML
  deceased: Deceased = {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    identityNumber: '012345678',
    fullName: 'ישראל ישראלי',
    fatherName: 'אברהם'
  };

  // אובייקט השק - תואם ל-bag ב-HTML
  bag: Bag = {
    deceasedId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    bagNumber: 'BG-99420',
    partDescription: 'זיהוי חלקי - גפיים בלבד' // אם תמחק את זה, יוצג "חלל שלם"
  };

  onConfirmSelection(): void {
    this.dialogRef.close({
      confirmed: true,
      bagNumber: this.bag.bagNumber
    });
  }
}
