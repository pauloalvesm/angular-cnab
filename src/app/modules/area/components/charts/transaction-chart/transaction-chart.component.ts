import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../../services/admin/admin.service';

Chart.register(...registerables);

@Component({
  selector: 'app-transaction-chart',
  standalone: false,
  templateUrl: './transaction-chart.component.html',
  styleUrl: './transaction-chart.component.scss'
})
export class TransactionChartComponent implements AfterViewInit {
  @ViewChild('transactionCanvas') private canvas!: ElementRef;

  constructor(private adminService: AdminService) { }

  ngAfterViewInit(): void {
    this.adminService.getTransactionCount().subscribe({
      next: (res) => {
        if (res && res.count !== undefined) {
          this.renderChart(res.count);
        }
      },
      error: (err) => console.error('[TransactionChart] Failed to fetch transaction count:', err)
    });
  }

  public renderChart(count: number): void {
    new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Start', 'Current Status'],
        datasets: [{
          label: 'Transaction Volume',
          data: [0, count],
          fill: true,
          backgroundColor: 'rgba(49, 217, 49, 0.2)',
          borderColor: '#31D931',
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#31D931'
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
