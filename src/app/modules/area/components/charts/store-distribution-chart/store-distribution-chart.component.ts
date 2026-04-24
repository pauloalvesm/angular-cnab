import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../../services/admin/admin.service';

Chart.register(...registerables);

@Component({
  selector: 'app-store-distribution-chart',
  standalone: false,
  templateUrl: './store-distribution-chart.component.html',
  styleUrl: './store-distribution-chart.component.scss'
})
export class StoreDistributionChartComponent implements AfterViewInit {
  @ViewChild('storeCanvas') private canvas!: ElementRef;

  constructor(private adminService: AdminService) { }

  ngAfterViewInit(): void {
    this.adminService.getStoreCount().subscribe({
      next: (res) => {
        if (res && res.count !== undefined) {
          this.renderChart(res.count);
        }
      },
      error: (err) => console.error('Error fetching total stores:', err)
    });
  }

  public renderChart(count: number): void {
    new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Registered Stores'],
        datasets: [{
          label: 'Quantity',
          data: [count],
          backgroundColor: 'rgba(49, 217, 49, 0.6)',
          borderColor: '#31D931',
          borderWidth: 1,
          barPercentage: 0.4,
          categoryPercentage: 0.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            grid: { color: 'rgba(0, 0, 0, 0.05)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
}
