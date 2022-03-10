import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import {
  Proxy,
  Booking,
  Feedback,
  Params_Get_Feedback_By_BOOKING_ID
} from 'src/app/core/services/proxy.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit,OnDestroy {

  @Input() oBooking!: Booking;
  oFeedback: Feedback[] = [];
  Edit_Feedback_Subscription = new Subscription()
  i_Params_Get_Feedback_By_BOOKING_ID = new Params_Get_Feedback_By_BOOKING_ID();
  Get_Feedback_By_BOOKING_ID_Subscription = new Subscription();
  i_Feedback = new Feedback();

  constructor(private proxy: Proxy,
    private dialog: MatDialog,
    private CmSvc: CommonService,) { }

  ngOnDestroy(): void {
    this.Edit_Feedback_Subscription.unsubscribe();
    this.Get_Feedback_By_BOOKING_ID_Subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.i_Params_Get_Feedback_By_BOOKING_ID.BOOKING_ID = this.oBooking.BOOKING_ID;
    this.Get_Feedback_By_BOOKING_ID_Subscription = this.proxy.Get_Feedback_By_BOOKING_ID(this.i_Params_Get_Feedback_By_BOOKING_ID).subscribe(
      (result) => {
        if (result != null && result.length != 0) {
          this.oFeedback = result;
          // console.log(result);

        } else {
          this.createFeedback();
        }
      }
    )
  }
  clickRating(rating: number) {
    this.oFeedback[0].RATING = rating;
    // console.log(this.oFeedback);

  }
  postFeedback() {
    // this.createFeedback();
    if (this.oFeedback[0].BOOKING_ID != this.oBooking.BOOKING_ID) {
      this.createFeedback();
    } else {
      this.editFeedback();
    }
  }

  createFeedback() {
    this.oFeedback[0].FEEDBACK_ID = -1;
    this.oFeedback[0].OWNER_ID = 1;
    this.oFeedback[0].BOOKING_ID = this.oBooking.BOOKING_ID;
    this.oFeedback[0].COMMENT = "";
    this.oFeedback[0].RATING = 0;


    this.Edit_Feedback_Subscription = this.proxy.Edit_Feedback(this.oFeedback[0]).subscribe(
      (result) => {
        if (result != null) {

        }
      }
    )
  }

  editFeedback() {
    let today = new Date();
    let date: string = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // console.log(date) // '2022-2-6'

    this.oFeedback[0].DATE = date;
    this.Edit_Feedback_Subscription = this.proxy.Edit_Feedback(this.oFeedback[0]).subscribe(
      (result) => {
        if (result != null) {
          this.CmSvc.ShowMessage("Done");
        }
      }
    )
  }

  deleteFeedback() {
    this.oFeedback[0].COMMENT = '';
    this.oFeedback[0].RATING = undefined;
    this.oFeedback[0].DATE = '';
    this.Edit_Feedback_Subscription = this.proxy.Edit_Feedback(this.oFeedback[0]).subscribe(
      (result) => {
        if (result != null) {
          this.CmSvc.ShowMessage("Done");
        }
      }
    )
  }
  cancelFeedback() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.deleteFeedback();

      }
    });

}
}

