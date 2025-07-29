import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss',
  standalone: true,
  imports: [SharedModule, BaseChartDirective],
})
export class DashboardCardComponent implements OnInit {

  @Input() chartData: ChartData;
  @Input() chartOptions: ChartOptions;

  chartType: ChartType = 'bar';
  chartLegend = true;

  // TODO: Remove "skipLibCheck": true from tsconfig when ng2-charts is updated to support angular 20

  ngOnInit(): void {

    if (!this.chartOptions) {
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
