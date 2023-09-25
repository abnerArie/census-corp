import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Highcharts from 'highcharts';


import { ChartComponent } from './chart.component';
import { HighchartsChartModule } from 'highcharts-angular';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HighchartsChartModule],
      declarations: [ChartComponent],
      // providers: [Highcharts]
    });
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.Highcharts = Highcharts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
