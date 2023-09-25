import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { PopulationNationData, PopulationStateData } from '../../interfaces/populationResponse.interface';
import { STATES_OF_AMERICA } from '../../constants/populationConstants';

@Component({
  selector: 'cen-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})

export class ChartComponent implements OnChanges {
  @Input() chartData: (PopulationNationData | PopulationStateData)[] | null = [];
  @Input() drilldown: 'Nation' | 'State' = 'Nation';
  @Input() seletedState: typeof STATES_OF_AMERICA | unknown = '';

  Highcharts: typeof Highcharts = Highcharts; // required
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'

  chartOptions: Highcharts.Options = {
    series: [{
      name: 'Population',
      type: 'line',
      data: []
    }],
    title: {
      text: 'Population',
      style: {
        color: 'orange'
      }
    },
    yAxis: {
      title: {
        text: 'Population',
      }
    },
    xAxis: {
      categories: ['2015', '2016', '2017', '2018', '2019', '2020'],
      accessibility: {
        description: 'Year Ranges'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2015
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 1200
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  }; // required

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chartOptions?.series?.[0]) return

    if (
      changes?.['chartData']?.currentValue !== changes?.['chartData']?.previousValue
      || changes?.['drilldown']?.currentValue !== changes?.['drilldown']?.previousValue
      || changes?.['seletedState']?.currentValue !== changes?.['seletedState']?.previousValue
    ) {
      this.chartOptions.series[0] = {
        name: 'Population',
        type: 'line',
        data: this.drilldown === 'Nation' ? this.mapPopulationToNationData(this.chartData as PopulationNationData[]) : this.mapPopulationToStateData(this.chartData as PopulationStateData[])
      }
    }

    this.updateFlag = true
  }


  mapPopulationToNationData = (populationData: PopulationNationData[]): number[] => {
    this.updateChartTitle('Population of USA')
    return populationData?.map((item: PopulationNationData | PopulationStateData) => item['Population'] || 0) || []
  }

  mapPopulationToStateData = (populationData: PopulationStateData[]): number[] => {
    if (this.seletedState === '' && this.drilldown === 'State') {
      this.updateChartTitle('Select a State to Plot Population')
      return []
    }


    this.updateChartTitle(`Population of ${this.seletedState}`)

    return populationData?.filter((item: PopulationStateData) => item['State'] === this.seletedState)
      .map((item: PopulationNationData | PopulationStateData) => item['Population'])
  }


  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
  }

  updateChartTitle = (title: string) => {
    if (!this.chartOptions?.title) { return }
    this.chartOptions.title.text = title
  }

}
