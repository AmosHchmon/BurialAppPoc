import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartData} from 'chart.js';
import {DashboardCardComponent} from '../dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent],
})
export class HomeComponent {

  dashboardCards: ChartData[] = [
    {
      labels: ['January', 'February', 'March'],
      datasets: [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [28, 98, 40, 19, 86, 27, 90], label: 'Series C'},
      ],
    },
    {
      labels: ['January', 'February', 'March'],
      datasets: [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [28, 98, 40, 19, 86, 27, 90], label: 'Series C'},
      ],
    },
    {
      labels: ['January', 'February', 'March'],
      datasets: [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [28, 98, 40, 19, 86, 27, 90], label: 'Series C'},
      ],
    },
    {
      labels: ['January', 'February', 'March'],
      datasets: [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [28, 98, 40, 19, 86, 27, 90], label: 'Series C'},
      ],
    },
    {
      labels: ['January', 'February', 'March'],
      datasets: [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [28, 98, 40, 19, 86, 27, 90], label: 'Series C'},
      ],
    },
    {
      labels: ['January', 'February', 'March'],
      datasets: [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [28, 98, 40, 19, 86, 27, 90], label: 'Series C'},
      ],
    },
  ];
}
