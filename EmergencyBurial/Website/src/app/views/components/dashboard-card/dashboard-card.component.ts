import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardActions, MatCardHeader} from '@angular/material/card';
import {ChartData, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatCardActions, BaseChartDirective],
})
export class DashboardCardComponent implements OnInit {

  @Input() chartData: ChartData;

  chartOptions: ChartOptions = {
    responsive: true,
  };
  chartType: ChartType = 'bar';
  chartLegend = true;

  // TODO: Remove "skipLibCheck": true from tsconfig when ng2-charts is updated to support angular 20

  ngOnInit(): void{

    if(!this.chartOptions || Object.keys(this.chartOptions).length === 0){
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      };
    }
  }
}
