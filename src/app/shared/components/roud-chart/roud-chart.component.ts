import { Component, Input, OnChanges, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'nga-roud-chart',
  templateUrl: './roud-chart.component.html',
  styleUrls: ['./roud-chart.component.scss']
})
export class RoudChartComponent implements OnChanges {

  @Input() dataLabel: [];
  @Input() dataValue:[];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {}

  ngOnChanges() {
    this.chartOptions = {
      series: this.dataValue,
      chart: {
        type: "donut",
      },
      labels: this.dataLabel,
      
      responsive: [
        {
          breakpoint: 1100,
          options: {
            legend: {
              show: false,
            },
            style:{
              fontSize: '5px',
            }
          }
        }
      ]
    };
  }
  }




