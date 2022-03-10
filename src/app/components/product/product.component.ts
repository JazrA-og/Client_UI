import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { Subscription } from 'rxjs';
import {
  Proxy,
  Params_Get_Service_prod_By_SERVICE_PROD_ID,
  Service_prod,
  Params_Get_Feedback_By_BOOKING_ID,
  Params_Get_Booking_By_SERVICE_PROD_ID,
  Params_Get_Category_By_CATEGORY_ID,
  Feedback,
  Client
} from 'src/app/core/services/proxy.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  serviceProd: Service_prod = new Service_prod();
  serviceProdID?: any;
  i_Params_Get_Service_prod_By_SERVICE_PROD_ID: Params_Get_Service_prod_By_SERVICE_PROD_ID = new Params_Get_Service_prod_By_SERVICE_PROD_ID();
  Get_Product_By_PRODUCT_ID_Adv_Subscription = new Subscription();

  clientList: Client[] = [];
  feedbackList: Feedback[] = [];

  i_Params_Get_Category_By_CATEGORY_ID = new Params_Get_Category_By_CATEGORY_ID();
  Get_Category_By_CATEGORY_ID_Subscription = new Subscription();

  i_Params_Get_Feedback_By_BOOKING_ID = new Params_Get_Feedback_By_BOOKING_ID();
  Get_Feedback_By_BOOKING_ID_Subscription = new Subscription();

  i_Params_Get_Booking_By_SERVICE_PROD_ID = new Params_Get_Booking_By_SERVICE_PROD_ID();
  Get_Booking_By_SERVICE_PROD_ID_Subscription = new Subscription();

  constructor(private proxy: Proxy,
    private CmSvc: CommonService,
    private router: Router,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    // this.i_Params_Get_Service_prod_By_SERVICE_PROD_ID.SERVICE_PROD_ID = 1;

    this.route.queryParams.subscribe(
      (d) => {
        this.serviceProdID = d['id']
      }
    )
    this.fetchData()
  }
  getServiceProd() {
    this.i_Params_Get_Service_prod_By_SERVICE_PROD_ID.SERVICE_PROD_ID = +this.serviceProdID;
    this.Get_Product_By_PRODUCT_ID_Adv_Subscription = this.proxy.Get_Service_prod_By_SERVICE_PROD_ID_Adv(this.i_Params_Get_Service_prod_By_SERVICE_PROD_ID).subscribe(result => {
      if (result != null) {
        this.serviceProd = result;

        this.i_Params_Get_Category_By_CATEGORY_ID.CATEGORY_ID = this.serviceProd.My_Sub_category.CATEGORY_ID;
        this.Get_Category_By_CATEGORY_ID_Subscription = this.proxy.Get_Category_By_CATEGORY_ID(this.i_Params_Get_Category_By_CATEGORY_ID).subscribe(
          (e) => {
            if (e != null) {
              this.serviceProd.My_Sub_category.My_Category = e;
            }
          }
        )
        // console.log(this.serviceProd);

      }
    });
  }
  goBooking(i_id: number | undefined) {

    this.router.navigate(
      ['/booking'],
      { queryParams: { id: i_id } }
    );

  }

  fetchData() {
    this.getServiceProd();
    // this.getFeedback();
  }
  ngOnDestroy(): void {
    this.Get_Product_By_PRODUCT_ID_Adv_Subscription.unsubscribe();
    this.Get_Booking_By_SERVICE_PROD_ID_Subscription.unsubscribe();
    this.Get_Feedback_By_BOOKING_ID_Subscription.unsubscribe();
    this.Get_Category_By_CATEGORY_ID_Subscription.unsubscribe()
  }

  getFeedback() {
    this.feedbackList = [];
    this.clientList = [];
    this.i_Params_Get_Booking_By_SERVICE_PROD_ID.SERVICE_PROD_ID = this.serviceProd.SERVICE_PROD_ID;
    this.Get_Booking_By_SERVICE_PROD_ID_Subscription = this.proxy.Get_Booking_By_SERVICE_PROD_ID_Adv(this.i_Params_Get_Booking_By_SERVICE_PROD_ID).subscribe(
      (result) => {
        if (result != null && result.length != 0) {
          result.forEach((element: any) => {
            this.i_Params_Get_Feedback_By_BOOKING_ID.BOOKING_ID = element.BOOKING_ID;
            this.Get_Feedback_By_BOOKING_ID_Subscription = this.proxy.Get_Feedback_By_BOOKING_ID(this.i_Params_Get_Feedback_By_BOOKING_ID).subscribe(
              (e) => {
                if (e != null && e.length != 0) {
                  if (e[0].COMMENT != '') {
                    this.feedbackList.push(e[0]);
                  this.clientList.push(element.My_Client);
                  }

                }
              }
            )
          });
        }
      }
    )
  }
}
