import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-app-shell-layout',
  imports: [RouterOutlet, MatIcon],
  templateUrl: './app-shell-layout.html',
  styleUrl: './app-shell-layout.scss',
})
export class AppShellLayout {

  router = inject(Router);

  openScanner() {
    this.router.navigate(['/scan']);
  }
}
