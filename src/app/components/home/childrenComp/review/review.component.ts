import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../../services/childServices/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {


  reviewData:any;

  constructor(private reviewService : ReviewService) { }

  ngOnInit() {
    let postData = {};
    postData["zomatoid"] = sessionStorage.getItem('zomatoid');

    this.reviewService.post(postData).subscribe((result) => {
      this.reviewData = JSON.parse(result.data)
    })

    this.createChart();
  }

  createChart(): any {


  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:any = {
    display:true,
    position:"right"
  };

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {

  }

}
