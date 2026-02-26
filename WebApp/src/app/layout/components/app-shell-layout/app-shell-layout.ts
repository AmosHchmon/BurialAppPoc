import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-app-shell-layout',
  imports: [RouterOutlet, MatIcon],
  templateUrl: './app-shell-layout.html',
  styleUrl: './app-shell-layout.scss',
})
export class AppShellLayout {


  openScanner() {
    console.log('פותח מצלמה לסריקה...');
    // כאן תבוא הקריאה לספריית הסריקה (למשל ngx-scanner)
  }
}
