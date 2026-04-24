import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDistributionChartComponent } from './store-distribution-chart.component';

describe('StoreDistributionChartComponent', () => {
  let component: StoreDistributionChartComponent;
  let fixture: ComponentFixture<StoreDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreDistributionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
