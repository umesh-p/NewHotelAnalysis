import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../../../services/childServices/analysis.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  analysisData: any = {};


  public barChartData: Array<any> = [{'data': [], 'label': 'Orders distribution per Hour'}];
  public barChartLabels: string[] = [];
  public barChartType = 'line';
  public barChartLegend = true;


  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {

      this.analysisService.getAll().subscribe((result) => {
        this.analysisData = JSON.parse(result['data']);
        this.barChartLabels = this.analysisData['orderHour'];
        this.barChartData = [{'data': this.analysisData['orderCountHour'], 'label': 'Orders distribution per Hour '}];
        console.log(this.analysisData);
        this.analysisData.avgTimePerOrder = this.millisToMinutesAndSeconds();

      });


  }

  public chartClicked(e: any): void {
  console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  millisToMinutesAndSeconds() {
    const avgTimePerOrder = parseInt(this.analysisData.avgTimePerOrder);

    const minutes = Math.floor(avgTimePerOrder / 60000);
    const seconds = ((avgTimePerOrder % 60000) / 1000).toFixed(0);

    return minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }


}
