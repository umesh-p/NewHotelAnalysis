import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../../../services/childServices/analysis.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor(private analysisService:AnalysisService) { }

  ngOnInit() {

      this.analysisService.getAll().subscribe((result) => {

      })

  }

}
