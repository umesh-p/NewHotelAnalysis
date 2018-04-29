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


  }





}
