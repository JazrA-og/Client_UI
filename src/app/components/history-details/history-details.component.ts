import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Proxy,
  Booking,
  Params_Get_Booking_By_BOOKING_ID,
  Params_Get_Status_By_STATUS_ID,
  Params_Get_Feedback_By_BOOKING_ID,
  Feedback,
  Status,
} from 'src/app/core/services/proxy.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';
import { CommonService } from 'src/app/core/services/common.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit, OnDestroy {

  date!: any;
  i_Booking: Booking = new Booking();

  is_feedback: Boolean = false;
  status!: Status;

  i_Params_Get_Feedback_By_BOOKING_ID = new Params_Get_Feedback_By_BOOKING_ID();
  Get_Feedback_By_BOOKING_ID_Subscription = new Subscription();

  i_Params_Get_Booking_By_BOOKING_ID = new Params_Get_Booking_By_BOOKING_ID();
  Get_Booking_By_BOOKING_ID_Subscription = new Subscription();

  i_Params_Get_Status_By_STATUS_ID = new Params_Get_Status_By_STATUS_ID();
  Get_Status_By_STATUS_ID_Subscription = new Subscription();

  Edit_Booking_Subscription = new Subscription();

  constructor(private proxy: Proxy,
    private route: ActivatedRoute,
    private CmSvc: CommonService,
    private saveCred: SaveCredentialsService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (d) => {
        this.i_Params_Get_Booking_By_BOOKING_ID.BOOKING_ID = d['id']
      }
    )
    this.getData()

  }

  getData() {
    this.Get_Booking_By_BOOKING_ID_Subscription = this.proxy.Get_Booking_By_BOOKING_ID_Adv(this.i_Params_Get_Booking_By_BOOKING_ID).subscribe(
      (result) => {
        if (result != null) {
          this.i_Params_Get_Feedback_By_BOOKING_ID.BOOKING_ID = result.BOOKING_ID;
          this.Get_Feedback_By_BOOKING_ID_Subscription = this.proxy.Get_Feedback_By_BOOKING_ID(this.i_Params_Get_Feedback_By_BOOKING_ID).subscribe(
            (e) => {
              if (e != null) {
                result.My_Feedbacks = e;
              }
            }
          )
          // const date =this.datePipe.transform(this.i_Booking.DATE, 'yyyy-MM-dd')
          // console.log(date);
          this.i_Booking = result;
        }
      }
    )

    this.i_Params_Get_Status_By_STATUS_ID.STATUS_ID = 3;
    this.Get_Status_By_STATUS_ID_Subscription = this.proxy.Get_Status_By_STATUS_ID(this.i_Params_Get_Status_By_STATUS_ID).subscribe(
      (result) => {
        if (result != null) {
          this.status = result;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.Edit_Booking_Subscription.unsubscribe();
    this.Get_Booking_By_BOOKING_ID_Subscription.unsubscribe();
    this.Get_Status_By_STATUS_ID_Subscription.unsubscribe();
  }

  submitRequest() {
    if (this.CmSvc.Is_Logged_In.getValue() == true) {
      this.cancelBooking();

    } else {
      this.location.back();
    }
  }

  cancelBooking() {
    this.i_Booking.STATUS_ID = this.status.STATUS_ID;
    this.i_Booking.My_Status = this.status;
    this.Edit_Booking_Subscription = this.proxy.Edit_Booking(this.i_Booking).subscribe(
      (result) => {

      }
    )
  }
  addFeedback() {
    this.is_feedback = !this.is_feedback;
  }

  cancelBooking02() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.cancelBooking();

      }
    });

  }

}
