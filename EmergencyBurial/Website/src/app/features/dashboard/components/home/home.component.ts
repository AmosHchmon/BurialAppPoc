import {Component, OnInit} from '@angular/core';
import {ChartData, ChartOptions} from 'chart.js';

import {DashboardCardComponent} from '../dashboard-card/dashboard-card.component';
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";

interface DashboardCard {
  data: ChartData;
  options: ChartOptions;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [UiComponentsModule, DashboardCardComponent],
})
export class HomeComponent implements OnInit {

  dashboardCards: DashboardCard[] = [];

  ngOnInit(): void {

    const chart1Data: ChartData<'bar'> = {
      labels: ['לא הוזן תר"ח', 'שדה תימן', 'תר"ח ציפורית', 'תר"ח שורה'],
      datasets: [
        {data: [4, 1, 0.5], label: 'איסוף', backgroundColor: '#008C9D'},
        {data: [17, 0, 1], label: 'זיהוי', backgroundColor: '#00B8D9'},
        {data: [9, 0, 1.5], label: 'בתהליך קבורה', backgroundColor: '#A06AF9'},
        {data: [9, 0, 1.5], label: 'נקבר', backgroundColor: '#A06AF9'},
      ],
    };

    const chart1Options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        title: {display: true, text: 'שקי חלל לפי סטטוס'}
      },
      scales: {
        x: {
          stacked: true, // עמודות מוערמות
        },
        y: {
          stacked: true,
          max: 30, // ערך מקסימלי בציר
          ticks: {
            stepSize: 10, // קפיצות של 10
          },
        },
      },
    };

    const chart2Data: ChartData<'bar'> = {
      labels: ['לא הוזן תר"ח', 'שדה תימן', 'תר"ח ציפורית', 'תר"ח שורה'],
      datasets: [
        {data: [2, 1, 3], label: 'לא זוהה', backgroundColor: '#4BC0C0'},
        {data: [2, 5, 1], label: 'זוהה', backgroundColor: '#00B8D9'},
        {data: [2, 5, 5], label: 'בתהליך', backgroundColor: '#A06AF9'}
      ],
    };

    const chart2Options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        title: {display: true, text: 'שקי חלל לפי סטטוס זיהוי'}
      },
      scales: {
        y: {
          max: 6, // הערך המקסימלי בציר
          ticks: {
            // שימוש בפונקציית callback להתאמה אישית של התוויות
            callback: (value: number | string) => {
              if (typeof value === 'number' && value === 0) {
                return '0';
              }
              return `${value}x`;
            }
          }
        }
      }
    };

    const chart3Data: ChartData<'bar'> = {
      labels: ['לא הוזן תר"ח', 'שדה תימן', 'תר"ח ציפורית', 'תר"ח שורה'],
      datasets: [
        {data: [4, 5, 2], label: 'בתהליך הכנה לקבורה', backgroundColor: '#4BC0C0'},
        {data: [2, 5, 3], label: 'נקבר - זמנית', backgroundColor: '#A06AF9'},
        {data: [2, 5, 3], label: 'נקבר - סופית', backgroundColor: '#4BC0C0'}
      ],
    };

    const chart3Options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        title: {display: true, text: 'שקי חלל לפי סטטוס זיהוי'}
      },
      scales: {
        y: {
          max: 6, // הערך המקסימלי בציר
          ticks: {
            // שימוש בפונקציית callback להתאמה אישית של התוויות
            callback: (value: number | string) => {
              if (typeof value === 'number' && value === 0) {
                return '0';
              }
              return `${value}x`;
            }
          }
        }
      }
    };

    const chart4Data: ChartData<'bar'> = {
      labels: ['לא הוזן תר"ח', 'שדה תימן', 'תר"ח ציפורית', 'תר"ח שורה'],
      datasets: [
        {data: [8, 1, 3], label: 'כמות', backgroundColor: '#008C9D'},
      ],
    };

    const chart4Options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        title: {display: true, text: 'כלל החללים שזוהו ויצאו מהתר"ח וטרם נקברו'}
      },
      scales: {
        x: {
          stacked: true, // עמודות מוערמות
        },
        y: {
          stacked: true,
          max: 30, // ערך מקסימלי בציר
          ticks: {
            stepSize: 10, // קפיצות של 10
          },
        },
      },
    };

    const chart5Data: ChartData<'bar'> = {
      labels: ['לא הוזן תר"ח', 'שדה תימן', 'תר"ח ציפורית', 'תר"ח שורה'],
      datasets: [
        {data: [2, 5, 3], label: 'זוהה', backgroundColor: '#4BC0C0'}
      ],
    };

    const chart5Options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        title: {display: true, text: 'כלל שקי החלל שנמצאים בתר"ח'}
      },
      scales: {
        y: {
          max: 6, // הערך המקסימלי בציר
          ticks: {
            // שימוש בפונקציית callback להתאמה אישית של התוויות
            callback: (value: number | string) => {
              if (typeof value === 'number' && value === 0) {
                return '0';
              }
              return `${value}x`;
            }
          }
        }
      }
    };

    const chart6Data: ChartData<'bar'> = {
      labels: ['לא הוזן תר"ח', 'שדה תימן', 'תר"ח ציפורית', 'תר"ח שורה'],
      datasets: [
        {data: [2, 5, 3], label: 'נתונים', backgroundColor: '#4BC0C0'}
      ],
    };

    const chart6Options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        title: {display: true, text: 'שקי חלל לפי סטטוס זיהוי'}
      },
      scales: {
        y: {
          max: 6, // הערך המקסימלי בציר
          ticks: {
            // שימוש בפונקציית callback להתאמה אישית של התוויות
            callback: (value: number | string) => {
              if (typeof value === 'number' && value === 0) {
                return '0';
              }
              return `${value}x`;
            }
          }
        }
      }
    };

    this.dashboardCards = [
      {data: chart1Data, options: chart1Options},
      {data: chart2Data, options: chart2Options},
      {data: chart3Data, options: chart3Options},
      {data: chart4Data, options: chart4Options},
      {data: chart5Data, options: chart5Options},
      {data: chart6Data, options: chart6Options},
    ];
  }
}
