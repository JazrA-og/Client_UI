import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Proxy,
  Params_Get_Business_By_BUSINESS_ID,
  Params_Get_Work_list_By_BUSINESS_ID,
  Business,
  Work_area
} from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit, OnDestroy {

  @Input() businessID!: number;
  business!: Business;
  workAreaList: Work_area[] = [];

  i_Params_Get_Business_By_BUSINESS_ID = new Params_Get_Business_By_BUSINESS_ID();
  Get_Business_By_BUSINESS_ID_Subscription = new Subscription();

  i_Params_Get_Work_list_By_BUSINESS_ID = new Params_Get_Work_list_By_BUSINESS_ID();
  Get_Work_list_By_BUSINESS_ID_Subscription = new Subscription();

  constructor(private proxy: Proxy) { }

  ngOnDestroy(): void {
    this.Get_Business_By_BUSINESS_ID_Subscription.unsubscribe();
    this.Get_Work_list_By_BUSINESS_ID_Subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.i_Params_Get_Business_By_BUSINESS_ID.BUSINESS_ID = this.businessID;
    this.Get_Business_By_BUSINESS_ID_Subscription = this.proxy.Get_Business_By_BUSINESS_ID_Adv(this.i_Params_Get_Business_By_BUSINESS_ID).subscribe(
      (result) => {
        if (result != null) {
          this.business = result;
          this.i_Params_Get_Work_list_By_BUSINESS_ID.BUSINESS_ID = this.business.BUSINESS_ID;
          this.Get_Work_list_By_BUSINESS_ID_Subscription = this.proxy.Get_Work_list_By_BUSINESS_ID_Adv(this.i_Params_Get_Work_list_By_BUSINESS_ID).subscribe(
            (res) => {
              if (res != null) {
                res.forEach((element) => {
                  if (element.IS_TRUE == true) {
                    this.workAreaList.push(element.My_Work_area);
                  }
                })
              }
            }
          )
        }
      }

    )

  }
}
