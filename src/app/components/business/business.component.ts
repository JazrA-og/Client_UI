import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import {
  Proxy,
  Business,
  Params_Get_Business_By_OWNER_ID,
  Params_Get_Work_area_By_OWNER_ID,
  Work_area,
  Work_list,
  Params_Get_Work_list_By_WORK_AREA_ID,
  Params_Get_Business_By_BUSINESS_ID
} from 'src/app/core/services/proxy.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  businessList: Business[] = [];
  workAreaList: Work_area[] = [];
  workList: Work_list[] = [];

  i_Params_Get_Work_list_By_WORK_AREA_ID = new Params_Get_Work_list_By_WORK_AREA_ID();
  Get_Work_list_By_WORK_AREA_ID_Subscription = new Subscription();

  i_Params_Get_Business_By_BUSINESS_ID = new Params_Get_Business_By_BUSINESS_ID();
  Get_Business_By_BUSINESS_ID_Subscription = new Subscription();

  Get_Business_By_OWNER_ID_Subscription = new Subscription();
  Get_Work_area_By_OWNER_ID_Subscription = new Subscription();

  i_Params_Get_Business_By_OWNER_ID = new Params_Get_Business_By_OWNER_ID();
  i_Params_Get_Work_area_By_OWNER_ID = new Params_Get_Work_area_By_OWNER_ID();

  constructor(private proxySrv: Proxy,
    private CmSvc: CommonService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.i_Params_Get_Business_By_OWNER_ID.OWNER_ID = 1;
    this.Get_Business_By_OWNER_ID_Subscription = this.proxySrv.Get_Business_By_OWNER_ID(this.i_Params_Get_Business_By_OWNER_ID).subscribe(
      (result) => {
        if (result != null) {
          this.businessList = result;
        }
      }
    )

    this.i_Params_Get_Work_area_By_OWNER_ID.OWNER_ID = 1;
    this.Get_Work_area_By_OWNER_ID_Subscription = this.proxySrv.Get_Work_area_By_OWNER_ID(this.i_Params_Get_Work_area_By_OWNER_ID).subscribe(
      (result) => {
        if (result != null) {
          this.workAreaList = result;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.Get_Business_By_OWNER_ID_Subscription.unsubscribe();
    this.Get_Work_area_By_OWNER_ID_Subscription.unsubscribe();
  }



  goBusiness(i_id: number | undefined) {
    this.router.navigate(
      ['/business-details'],
      { queryParams: { id: i_id } }
    );
  }

  clearBusinessList() {
    this.businessList = [];
  }

  getDataByWorkArea(id: number | undefined) {
    this.clearBusinessList();
    this.i_Params_Get_Work_list_By_WORK_AREA_ID.WORK_AREA_ID = id;
    this.Get_Work_list_By_WORK_AREA_ID_Subscription = this.proxySrv.Get_Work_list_By_WORK_AREA_ID(this.i_Params_Get_Work_list_By_WORK_AREA_ID).subscribe(
      (result) => {
        if (result != null) {
          result.forEach((element) => {
            if (element.IS_TRUE == true) {
              this.i_Params_Get_Business_By_BUSINESS_ID.BUSINESS_ID = element.BUSINESS_ID;
              this.Get_Business_By_BUSINESS_ID_Subscription = this.proxySrv.Get_Business_By_BUSINESS_ID_Adv(this.i_Params_Get_Business_By_BUSINESS_ID).subscribe(
                (e) => {
                  if (e != null) {
                    this.businessList.push(e);
                  }
                }
              )
            }
          })
        }
      }
    )
  }
}
