import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TransportService } from 'src/app/layout/services/transport-service.service';

@Component({
  selector: 'app-active-transport',
  imports: [MatIconModule],
  templateUrl: './active-transport.html',
  styleUrl: './active-transport.scss',
})
export class ActiveTransport {

   constructor(
    public router : Router,
    public transportService : TransportService,
  ) { }

  // גישה קלה לרשימה מתוך ה-HTML
  get bags() {
    return this.transportService.activeBags();
  }

  onFinalize() {
    // שליחה ל-API וניקוי
    this.transportService.clearTransport();
    this.router.navigate(['/success-screen']);
  }

  onCancel() {
    if(confirm("האם לבטל את כל השינוע הנוכחי?")) {
      this.transportService.clearTransport();
    }
  }
}
