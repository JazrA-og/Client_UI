import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Proxy,
  Client,
  Service_prod,
  Status,
  Booking,
  Params_Get_Status_By_OWNER_ID,
  Params_Get_Service_prod_By_SERVICE_PROD_ID,
  Params_Get_Client_By_CLIENT_ID,
  Feedback
} from 'src/app/core/services/proxy.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {

  clientID!: number;
  client!: Client;

  serviceProdID!: number;
  serviceProd!: Service_prod;

  statusList: Status[] = [];

  oFeedback = new Feedback();
  booking!: Booking;
  i_Booking: Booking = new Booking();

  Get_Client_By_CLIENT_ID_Subscription = new Subscription();
  i_Params_Get_Client_By_CLIENT_ID: Params_Get_Client_By_CLIENT_ID = new Params_Get_Client_By_CLIENT_ID();

  Get_Product_By_PRODUCT_ID_Adv_Subscription = new Subscription();
  i_Params_Get_Service_prod_By_SERVICE_PROD_ID: Params_Get_Service_prod_By_SERVICE_PROD_ID = new Params_Get_Service_prod_By_SERVICE_PROD_ID();

  Get_Status_By_OWNER_ID_Subscription = new Subscription();
  i_Params_Get_Status_By_OWNER_ID: Params_Get_Status_By_OWNER_ID = new Params_Get_Status_By_OWNER_ID();

  Edit_Booking_Subscription = new Subscription();
  Edit_Feedback_Subscription = new Subscription();

  constructor(private proxy: Proxy,
    private route: ActivatedRoute,
    private CmSvc: CommonService,
    private saveCred: SaveCredentialsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (d) => {
        this.serviceProdID = d['id']
        // console.log(this.serviceProdID);
        this.serviceProd?.My_Business.MINIMUM_COST
      }
    )

    this.getData()
  }

  getData() {
    this.i_Params_Get_Service_prod_By_SERVICE_PROD_ID.SERVICE_PROD_ID = this.serviceProdID;
    this.Get_Product_By_PRODUCT_ID_Adv_Subscription = this.proxy.Get_Service_prod_By_SERVICE_PROD_ID_Adv(this.i_Params_Get_Service_prod_By_SERVICE_PROD_ID).subscribe(result => {
      if (result != null) {
        this.serviceProd = result;
        // console.log(this.serviceProd);
      }
    });
    this.i_Params_Get_Status_By_OWNER_ID.OWNER_ID = 1;
    this.Get_Status_By_OWNER_ID_Subscription = this.proxy.Get_Status_By_OWNER_ID(this.i_Params_Get_Status_By_OWNER_ID).subscribe(result => {
      if (result != null) {
        this.statusList = result;
      }
    });

    this.client = this.saveCred.getLocalClient();
  }

  ngOnDestroy(): void {
    this.Get_Client_By_CLIENT_ID_Subscription.unsubscribe();
    this.Get_Status_By_OWNER_ID_Subscription.unsubscribe();
    this.Edit_Booking_Subscription.unsubscribe();
    this.Edit_Feedback_Subscription.unsubscribe();
  }

  submitRequest() {
    if (this.CmSvc.Is_Logged_In.getValue() == true) {
      this.addBooking()
    } else {
      this.router.navigate(
        ['/login'],
      );
    }
  }

  addBooking() {

    this.i_Booking.BOOKING_ID = -1;
    this.i_Booking.OWNER_ID = 1;
    this.i_Booking.BUSINESS_ID = this.serviceProd.BUSINESS_ID;
    this.i_Booking.SERVICE_PROD_ID = this.serviceProd.SERVICE_PROD_ID;
    this.i_Booking.CLIENT_ID = this.client.CLIENT_ID;
    this.i_Booking.STATUS_ID = 1;
    // this.i_Booking.WORK_AREA_ID = 9;
    this.i_Booking.DATE = '';
    this.i_Booking.DESCRIPTION = '';
    // this.i_Booking.TOTAL_PRICE = this.serviceProd.PRICE + this.serviceProd.My_Business.MINIMUM_COST;

    this.Edit_Booking_Subscription = this.proxy.Edit_Booking(this.i_Booking).subscribe(
      (result) => {
        if (result != null) {
          this.CmSvc.ShowMessage("Booking Successful");

          this.addFeedback(result);
        }
      }
    )

  }

 private addFeedback(booking: Booking) {
   this.oFeedback.OWNER_ID = 1;
   this.oFeedback.COMMENT = '';
  //  this.oFeedback.RATING = 0;
   this.oFeedback.FEEDBACK_ID = -1;
   this.oFeedback.BOOKING_ID  = booking.BOOKING_ID;

 this.Edit_Feedback_Subscription =  this.proxy.Edit_Feedback(this.oFeedback).subscribe(
   (result) => {
     if (result != null) {

     }
    }
   )

  }
}


