import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalBalance = 0;
  storeCount = 0;
  transactionCount = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  public loadDashboardData(): void {
    this.adminService.getTotalBalance().subscribe(res => this.totalBalance = res.totalBalance);
    this.adminService.getStoreCount().subscribe(res => this.storeCount = res.count);
    this.adminService.getTransactionCount().subscribe(res => this.transactionCount = res.count);
  }

}
