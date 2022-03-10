import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import {
  Proxy,
  Booking,
  Params_Get_Booking_By_Where,
  Params_Delete_Booking,
  Service_prod,
  Params_Get_Service_prod_By_OWNER_ID,
  Client,
  Params_Get_Client_By_OWNER_ID,
  Work_area,
  Params_Get_Work_area_By_OWNER_ID,
  Status,
  Params_Get_Status_By_OWNER_ID,
  Feedback,
  Params_Get_Feedback_By_OWNER_ID,

  } from '../../core/services/proxy.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  Get_Booking_By_Where_Subscription = new Subscription();
  searchModel: Params_Get_Booking_By_Where = new Params_Get_Booking_By_Where();
  data: Booking[] = [];

    Service_prodList!: Service_prod[];
  _params_Get_Service_prod_By_OWNER_ID = new Params_Get_Service_prod_By_OWNER_ID();
  Get_Service_prod_By_OWNER_ID_Subscription = new Subscription();

  ClientList!: Client[];
  _params_Get_Client_By_OWNER_ID = new Params_Get_Client_By_OWNER_ID();
  Get_Client_By_OWNER_ID_Subscription = new Subscription();

  Work_areaList!: Work_area[];
  _params_Get_Work_area_By_OWNER_ID = new Params_Get_Work_area_By_OWNER_ID();
  Get_Work_area_By_OWNER_ID_Subscription = new Subscription();

  StatusList!: Status[];
  _params_Get_Status_By_OWNER_ID = new Params_Get_Status_By_OWNER_ID();
  Get_Status_By_OWNER_ID_Subscription = new Subscription();

  FeedbackList!: Feedback[];
  _params_Get_Feedback_By_OWNER_ID = new Params_Get_Feedback_By_OWNER_ID();
  Get_Feedback_By_OWNER_ID_Subscription = new Subscription();

  BookingList!: Booking[];
  // _params_Get_Booking_By_CLIENT_ID = new Params_Get_Booking_By_CLIENT_ID();
  // Get_Booking_By_CLIENT_ID_Subscription = new Subscription();

  constructor(private proxy: Proxy, private CmSvc: CommonService) {}

  ngOnInit(): void {
  this.searchModel.START_ROW = 0;

  this._params_Get_Service_prod_By_OWNER_ID.OWNER_ID = 1;
  this.Get_Service_prod_By_OWNER_ID_Subscription = this.proxy.Get_Service_prod_By_OWNER_ID(this._params_Get_Service_prod_By_OWNER_ID).subscribe(result => this.Service_prodList = result);

  this._params_Get_Client_By_OWNER_ID.OWNER_ID = 1;
  this.Get_Client_By_OWNER_ID_Subscription = this.proxy.Get_Client_By_OWNER_ID(this._params_Get_Client_By_OWNER_ID).subscribe(result => this.ClientList = result);

  this._params_Get_Work_area_By_OWNER_ID.OWNER_ID = 1;
  this.Get_Work_area_By_OWNER_ID_Subscription = this.proxy.Get_Work_area_By_OWNER_ID(this._params_Get_Work_area_By_OWNER_ID).subscribe(result => this.Work_areaList = result);

  this._params_Get_Status_By_OWNER_ID.OWNER_ID = 1;
  this.Get_Status_By_OWNER_ID_Subscription = this.proxy.Get_Status_By_OWNER_ID(this._params_Get_Status_By_OWNER_ID).subscribe(result => this.StatusList = result);

  this._params_Get_Feedback_By_OWNER_ID.OWNER_ID = 1;
  this.Get_Feedback_By_OWNER_ID_Subscription = this.proxy.Get_Feedback_By_OWNER_ID(this._params_Get_Feedback_By_OWNER_ID).subscribe(result => this.FeedbackList = result);


  this.fetchData();
  }
  ngOnDestroy(): void {
  this.Get_Booking_By_Where_Subscription.unsubscribe();
  this.Get_Service_prod_By_OWNER_ID_Subscription.unsubscribe();
  this.Get_Client_By_OWNER_ID_Subscription.unsubscribe();
  this.Get_Work_area_By_OWNER_ID_Subscription.unsubscribe();
  this.Get_Status_By_OWNER_ID_Subscription.unsubscribe();
  this.Get_Feedback_By_OWNER_ID_Subscription.unsubscribe();

  }
  ClearAndFetch() {
  this.data = [];
  this.searchModel.START_ROW  = 0;
  this.fetchData();
  }
  fetchData() {
  this.searchModel.END_ROW = this.searchModel.START_ROW! + 10;
  this.Get_Booking_By_Where_Subscription = this.proxy.Get_Booking_By_Where(this.searchModel).subscribe(result => {
   if (result != null) {
  result.My_Result.forEach((element: any) => {
  this.data.push(element);
  });
  }
  });
  }
  AddEntry() {
  if (this.data !== undefined) {
  if (this.data.filter(e => e.BOOKING_ID === -1).length > 0) {
  return;
  }
  }
  const record = new Booking();
  record.BOOKING_ID = -1;
  this.data.unshift(record);
  }
  Edit(current: Booking) {
  this.proxy.Edit_Booking(current).subscribe((result) => {
  if (result != null) {
  this.CmSvc.ShowMessage('Done');
  if (current.BOOKING_ID === -1) {
  this.data.splice(this.data.indexOf(current), 1);
  const newEntry: any = result;
  newEntry.MyUploadedImages = [];
  newEntry.MyURL = this.CmSvc.APIUrl + '/Upload_Image?REL_ENTITY=[TBL_BOOKING]&REL_FIELD=BOOKING_IMAGE&REL_KEY=' + newEntry.BOOKING_ID;
  this.data.unshift(newEntry);
  }
  }
  });
  }

  onScroll () {
  this.searchModel.START_ROW = this.searchModel.START_ROW! + 10;
    this.fetchData();
  }

  // goBack() {
  // this.location.back();
  // }
}
