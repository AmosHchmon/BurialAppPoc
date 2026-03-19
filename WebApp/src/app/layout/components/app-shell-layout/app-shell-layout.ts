import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { TransportService } from '../../services/transport-service.service';

@Component({
  selector: 'app-app-shell-layout',
  imports: [RouterOutlet, MatIcon],
  templateUrl: './app-shell-layout.html',
  styleUrl: './app-shell-layout.scss',
})
export class AppShellLayout {

  constructor(
     public router : Router,
     public transportService : TransportService,
   ) { }

  openScanner() {
    this.router.navigate(['/scan']);
  }

  openManualSelection() {
    this.router.navigate(['/manual-selection']);
  }

  openActiveTransport() {
    this.router.navigate(['/active-transport']);
  }
}
